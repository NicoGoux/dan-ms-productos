import { ProductService } from '../service/product.service.js';

const productService = ProductService.getInstance();

const getProducts = async (req, res) => {
	try {
		const query = req.query;
		const products = await productService.getProducts(query);
		return res.json(products);
	} catch (error) {
		cLog.red(error);
		return res.json({
			error: error,
		});
	}
};

const getProductById = async (req, res) => {
	try {
		const { id } = req.params;
		const products = await productService.getProductById(id);
		return res.json(products);
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

const addProduct = async (req, res) => {
	try {
		const data = req.body;
		const product = await productService.addProduct(data);
		return res.json(product);
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const patch = req.body;
		const product = await productService.updateProduct(patch, id);
		return res.json(product);
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		await productService.deleteProduct(id);
		return res.json({ message: 'product deleted' });
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

export { getProducts, getProductById, addProduct, updateProduct, deleteProduct };
