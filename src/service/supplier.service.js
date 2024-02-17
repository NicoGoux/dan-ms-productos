import { PrismaClient } from "@prisma/client";
import { CustomError } from "../utils/customError.js";

let instance;
let prisma;

class SupplierService {
    // Singleton class
    static getInstance() {
        if (instance) {
            return instance;
        } else {
            return new SupplierService();
        }
    }

    constructor() {
        prisma = new PrismaClient();
    }

    async getSuppliers() {
        try {
            return await prisma.proveedor.findMany();
        } catch (error) {
            console.error(error);
            throw new CustomError("Error on Get Suppliers", 501, "La solicitud no pudo ser procesada");
        }
    }

    async getSupplierById(id) {
        try {
            return await prisma.proveedor.findUnique({
                where: {
                    id: parseInt(id),
                },
            });
        } catch (error) {
            console.error(error);
            throw new CustomError("Error on Get Supplier", 501, "La solicitud no pudo ser procesada");
        }
    }

    async getSupplierByName(name) {
        try {
            return await prisma.proveedor.findMany({
                where: {
                    nombre: {
                        startsWith: name,
                        mode: "insensitive",
                    },
                },
            });
        } catch (error) {
            console.error(error);
            throw new CustomError("Error on Get Supplier", 501, "La solicitud no pudo ser procesada");
        }
    }

    async populateSuppliers() {
        // await prisma.proveedor.create({
        //     data: {
        //         nombre: "Apple",
        //         mail: "proveedores@apple.com",
        //     },
        // });
        // await prisma.proveedor.create({
        //     data: {
        //         nombre: "Nike",
        //         mail: "proveedores@nike.com",
        //     },
        // });
        // await prisma.proveedor.create({
        //     data: {
        //         nombre: "Ikea",
        //         mail: "proveedores@ikea.com",
        //     },
        // });
        // await prisma.proveedor.create({
        //     data: {
        //         nombre: "Samsung",
        //         mail: "proveedores@samsung.com",
        //     },
        // });
        // await prisma.proveedor.create({
        //     data: {
        //         nombre: "Adidas",
        //         mail: "proveedores@adidas.com",
        //     },
        // });
    }
}

export { SupplierService };
