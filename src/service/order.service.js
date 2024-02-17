import { PrismaClient } from '@prisma/client';
import { CustomError } from '../utils/customError.js';

let instance;
let prisma;

class OrderService {
	// Singleton class
	static getInstance() {
		if (instance) {
			return instance;
		} else {
			return new OrderService();
		}
	}

	constructor() {
		prisma = new PrismaClient();
	}

	async getOrderById(id) {
		try {
			const order = await prisma.ordenProvision.findUnique({
				include: {
					detalles: {
						include: {
							producto: true,
						},
					},
				},
				where: {
					id: parseInt(id),
				},
			});
			if (!order) {
				throw new CustomError('Not Found', 404, 'La orden no fue encontrada');
			}
			return order;
		} catch (error) {
			console.error(error);
			if (error instanceof CustomError) {
				throw error;
			}
			throw new CustomError(
				'Error on get order',
				501,
				'La solicitud no pudo ser procesada',
			);
		}
	}

	async getOrders(query) {
		try {
			const { supplierId, genMinDate, genMaxDate, recMinDate, recMaxDate } = query;
			const where = {};

			if (supplierId) {
				where.proveedorId = parseInt(supplierId);
			}
			if (genMinDate || genMaxDate) {
				where.fechaGeneracion = {};

				if (genMinDate) {
					where.fechaGeneracion.gte = new Date(genMinDate);
				}
				if (genMaxDate) {
					where.fechaGeneracion.lte = new Date(genMaxDate);
				}
			}
			if (recMinDate || recMaxDate) {
				where.fechaRecepcion = {};

				if (recMinDate) {
					where.fechaRecepcion.gte = new Date(recMinDate);
				}
				if (recMaxDate) {
					where.fechaRecepcion.lte = new Date(recMaxDate);
				}
			}

			const order = await prisma.ordenProvision.findMany({
				include: {
					detalles: {
						include: {
							producto: true,
						},
					},
				},
				where: where,
			});
			return order;
		} catch (error) {
			console.error(error);
			throw new CustomError(
				'Error on get order',
				501,
				'La solicitud no pudo ser procesada',
			);
		}
	}

	async createOrder(orderData) {
		try {
			for (const detalle of orderData.detalles) {
				const producto = await prisma.producto.findUnique({
					where: {
						id: parseInt(detalle.productoId),
					},
				});
				if (producto.proveedorId !== orderData.proveedorId) {
					throw new CustomError(
						'Error on create order',
						400,
						'Los productos deben pertenecer al proveedor especificado',
					);
				}
			}

			const order = await prisma.ordenProvision.create({
				data: {
					proveedor: {
						connect: { id: orderData.proveedorId },
					},
					detalles: {
						createMany: {
							data: orderData.detalles.map((detalle) => {
								return {
									cantidad: detalle.cantidad,
									productoId: detalle.productoId,
									precio: detalle.precio,
								};
							}),
						},
					},
				},
			});
			return order;
		} catch (error) {
			console.error(error);
			throw new CustomError(
				'Error on create order',
				501,
				'La solicitud no pudo ser procesada',
			);
		}
	}

	async cancelOrder(id) {
		try {
			const order = await prisma.ordenProvision.update({
				where: {
					id: parseInt(id),
				},
				data: {
					esCancelada: true,
					fechaRecepcion: null,
				},
			});
			return order;
		} catch (error) {
			console.error(error);
			if (error.code === 'P2025') {
				throw new CustomError('Not Found', 404, 'La orden no fue encontrada');
			}
			throw new CustomError(
				'Error on update order',
				501,
				'La solicitud no pudo ser procesada',
			);
		}
	}

	async receiveOrder(id) {
		try {
			const order = await prisma.ordenProvision.findUnique({
				where: { id: parseInt(id) },
				include: { detalles: { include: { producto: true } } },
			});
			if (order.fechaRecepcion != null) {
				throw new CustomError(
					'Error on update order',
					409,
					'La orden ya fue recibida',
				);
			}

			const updates = [];

			// Actualizar la orden de provisión
			updates.push(
				prisma.ordenProvision.update({
					where: {
						id: parseInt(id),
					},
					data: {
						esCancelada: false,
						fechaRecepcion: new Date(),
					},
				}),
			);

			// Actualizar el stock de cada producto
			for (const detalle of order.detalles) {
				const producto = detalle.producto;
				const nuevoStock = producto.stockActual + detalle.cantidad;

				// Agregar la promesa de actualización al array
				updates.push(
					prisma.producto.update({
						where: { id: producto.id },
						data: { stockActual: nuevoStock },
					}),
				);
			}

			await prisma.$transaction(updates);

			const orderUpdated = await prisma.ordenProvision.findUnique({
				where: { id: parseInt(id) },
				include: { detalles: { include: { producto: true } } },
			});

			return orderUpdated;
		} catch (error) {
			console.error(error);
			throw new CustomError(
				'Error on create order',
				501,
				'La solicitud no pudo ser procesada',
			);
		}
	}
}

export { OrderService };
