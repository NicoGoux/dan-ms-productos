import { PrismaClient } from '@prisma/client';
import { CustomError } from '../utils/customError.js';

let instance;
let prisma;

class ProductService {
	// Singleton class
	static getInstance() {
		if (instance) {
			return instance;
		} else {
			return new ProductService();
		}
	}

	constructor() {
		prisma = new PrismaClient();
	}

	async getProducts(query) {
		try {
			const queryObject = {
				name: '',
				supplier: '',
				category: '',
				stock: '1',
				...query,
			};

			const products = await prisma.producto.findMany({
				include: {
					proveedor: true,
					categoria: true,
				},
				where: {
					nombre: {
						contains: queryObject.name,
						mode: 'insensitive',
					},
					proveedor: {
						nombre: {
							startsWith: queryObject.supplier,
							mode: 'insensitive',
						},
					},
					categoria: {
						nombre: {
							startsWith: queryObject.category,
							mode: 'insensitive',
						},
					},
					stockActual: {
						gte: parseInt(queryObject.stock),
					},
				},
			});
			return products;
		} catch (error) {
			console.error(error);
			throw new CustomError(
				'Error on get products',
				501,
				'La solicitud no pudo ser procesada',
			);
		}
	}

	async getProductById(id) {
		try {
			const products = await prisma.producto.findUnique({
				where: {
					id: parseInt(id),
				},
			});
			return products;
		} catch (error) {
			console.error(error);
			throw new CustomError(
				'Error on get product',
				501,
				'La solicitud no pudo ser procesada',
			);
		}
	}

	async addProduct(data) {
		try {
			if (!data.nombre || !data.descripcion) {
				throw new CustomError(
					'Conflict',
					409,
					'Es necesario un nombre y una descripcion',
				);
			}
			data = {
				...data,
				proveedor: {
					connect: { id: data.proveedor },
				},
				categoria: {
					connect: { id: data.categoria },
				},
			};
			const product = await prisma.producto.create({
				data: data,
			});
			return product;
		} catch (error) {
			if (error instanceof CustomError) {
				throw error;
			}
			throw new CustomError(
				'Error on Create Product',
				501,
				'La solicitud no pudo ser procesada',
			);
		}
	}

	async updateProduct(patch, id) {
		try {
			if (patch.stockActual) {
				throw new CustomError(
					'Not allowed',
					405,
					'El stock actual no puede ser actualizado',
				);
			}
			const productUpdated = await prisma.producto.update({
				where: {
					id: parseInt(id),
				},
				data: patch,
			});
			return productUpdated;
		} catch (error) {
			console.error(error);
			if (error.code === 'P2025') {
				throw new CustomError('Not Found', 404, 'El producto no fue encontrado');
			}
			throw new CustomError(
				'Error on Update Product',
				501,
				'La solicitud no pudo ser procesada',
			);
		}
	}

	async deleteProduct(id) {
		try {
			await prisma.producto.delete({
				where: {
					id: parseInt(id),
				},
			});
		} catch (error) {
			console.error(error);
			if (error.code === 'P2025') {
				throw new CustomError('Not Found', 404, 'El producto no fue encontrado');
			}
			throw new CustomError(
				'Error on Delete Product',
				501,
				'La solicitud no pudo ser procesada',
			);
		}
	}
}

export { ProductService };
