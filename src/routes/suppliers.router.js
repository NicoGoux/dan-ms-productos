import express from "express";
import { getSuppliers, getSupplierById, getSupplierByName, populateSuppliers } from "../controllers/supplier.controller.js";

const supplierRouter = express.Router();

supplierRouter.get("/", getSuppliers);

supplierRouter.get("/id/:id", getSupplierById);

supplierRouter.get("/name/:name", getSupplierByName);

supplierRouter.get("/populate", populateSuppliers);

export { supplierRouter };
