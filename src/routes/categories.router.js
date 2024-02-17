import express from "express";
import { getCategories, populateCategories, getCategoryById, getCategoryByName } from "../controllers/category.controller.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);

categoryRouter.get("/id/:id", getCategoryById);

categoryRouter.get("/name/:name", getCategoryByName);

categoryRouter.get("/populate", populateCategories);

export { categoryRouter };
