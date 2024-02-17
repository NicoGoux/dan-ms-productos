import express from "express";
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);

productRouter.get("/:id", getProductById);

productRouter.post("/", addProduct);

productRouter.patch("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);

export { productRouter };
