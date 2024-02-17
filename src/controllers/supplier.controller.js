import { SupplierService } from '../service/supplier.service.js';

const supplierService = SupplierService.getInstance();

const getSuppliers = async (req, res) => {
	try {
		const suppliers = await supplierService.getSuppliers();
		return res.json(suppliers);
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

const getSupplierById = async (req, res) => {
	try {
		const { id } = req.params;

		const suppliers = await supplierService.getSupplierById(id);
		return res.json(suppliers);
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

const getSupplierByName = async (req, res) => {
	try {
		const { name } = req.params;

		const suppliers = await supplierService.getSupplierByName(name);
		return res.json(suppliers);
	} catch (error) {
		cLog.red(error);
		return res.status(error.code).json({
			error: error.type,
			message: error.message,
		});
	}
};

const populateSuppliers = async (req, res) => {
	try {
		await supplierService.populateSuppliers();
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

export { getSuppliers, getSupplierById, getSupplierByName, populateSuppliers };
