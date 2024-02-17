import express from "express";
import { categoryRouter } from "./categories.router.js";
import { productRouter } from "./products.router.js";
import { supplierRouter } from "./suppliers.router.js";
import { orderRouter } from "./order.router.js";

const router = express.Router();

function routerApi(app) {
    app.use("/api/v1", router);
    router.use("/products", productRouter);
    router.use("/suppliers", supplierRouter);
    router.use("/orders", orderRouter);
    router.use("/categories", categoryRouter);
}

router.get("/", (req, res) => {
    res.send("[Server] connected");
});

export { routerApi };
