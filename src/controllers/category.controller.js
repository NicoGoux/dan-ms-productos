import { CategoryService } from '../service/category.service.js';
import cLog from '../utils/cLog.js';

const categoryService = CategoryService.getInstance();

const getCategories = async (req, res) => {
	try {
		const categories = await categoryService.getCategories();
		return res.json(categories);
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

const getCategoryById = async (req, res) => {
	try {
		const { id } = req.params;

		const categories = await categoryService.getCategoryById(id);
		return res.json(categories);
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

const getCategoryByName = async (req, res) => {
	try {
		const { name } = req.params;

		const categories = await categoryService.getCategoryByName(name);
		return res.json(categories);
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

const populateCategories = async (req, res) => {
	try {
		await categoryService.populateCategories();
		return res.json({
			message: 'populate complete',
		});
	} catch (error) {
		cLog.red(error);
		return res.json({
			error: 'populate error',
		});
	}
};
export { getCategories, populateCategories, getCategoryById, getCategoryByName };
