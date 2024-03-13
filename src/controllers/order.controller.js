import { OrderService } from '../service/order.service.js';
import cLog from '../utils/cLog.js';

const orderService = OrderService.getInstance();

/**
 * Recibe los siguientes filtros:
 * @supplierId id del proveedor
 * @genMinDate fecha minima de generacion
 * @genMaxDate fecha maxima de generacion
 * @recMinDate fecha minima de recepcion
 * @recMaxDate fecha maxima de recepcion
 */
const getOrders = async (req, res) => {
	try {
		const query = req.query;
		const order = await orderService.getOrders(query);
		return res.json(order);
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

const getOrderById = async (req, res) => {
	try {
		const { id } = req.params;
		const order = await orderService.getOrderById(id);
		return res.json(order);
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

const createOrder = async (req, res) => {
	try {
		const data = req.body;
		const order = await orderService.createOrder(data);
		return res.json(order);
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

const cancelOrder = async (req, res) => {
	try {
		const { id } = req.params;
		const order = await orderService.cancelOrder(id);
		return res.json(order);
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

const receiveOrder = async (req, res) => {
	try {
		const { id } = req.params;
		const order = await orderService.receiveOrder(id);
		return res.json(order);
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

export { getOrderById, getOrders, createOrder, cancelOrder, receiveOrder };
