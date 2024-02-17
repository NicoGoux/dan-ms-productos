import express from 'express';
import {
	cancelOrder,
	createOrder,
	getOrderById,
	getOrders,
	receiveOrder,
} from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.get('/id/:id', getOrderById);

orderRouter.get('/', getOrders);

orderRouter.post('/', createOrder);

orderRouter.patch('/id/:id/cancel', cancelOrder);

orderRouter.patch('/id/:id/receive', receiveOrder);

export { orderRouter };
