import { PrismaClient } from "@prisma/client";
import { CustomError } from "../utils/customError.js";

let instance;
let prisma;

class CategoryService {
    // Singleton class
    static getInstance() {
        if (instance) {
            return instance;
        } else {
            return new CategoryService();
        }
    }

    constructor() {
        prisma = new PrismaClient();
    }

    async getCategories() {
        try {
            return await prisma.categoria.findMany();
        } catch (error) {
            console.error(error);
            throw new CustomError("Error on Get Categories", 501, "La solicitud no pudo ser procesada");
        }
    }

    async getCategoryById(id) {
        try {
            return await prisma.categoria.findUnique({
                where: {
                    id: parseInt(id),
                },
            });
        } catch (error) {
            console.error(error);
            throw new CustomError("Error on Get Category", 501, "La solicitud no pudo ser procesada");
        }
    }

    async getCategoryByName(name) {
        try {
            return await prisma.categoria.findMany({
                where: {
                    nombre: {
                        startsWith: name,
                        mode: "insensitive",
                    },
                },
            });
        } catch (error) {
            console.error(error);
            throw new CustomError("Error on Get Category", 501, "La solicitud no pudo ser procesada");
        }
    }

    async populateCategories() {
        // await prisma.categoria.create({
        //     data: {
        //         nombre: "Tecnologia",
        //     },
        // });
        // await prisma.categoria.create({
        //     data: {
        //         nombre: "Ropa",
        //     },
        // });
        // await prisma.categoria.create({
        //     data: {
        //         nombre: "Muebles",
        //     },
        // });
        // await prisma.categoria.create({
        //     data: {
        //         nombre: "Hogar",
        //     },
        // });
        // await prisma.categoria.create({
        //     data: {
        //         nombre: "Deportes",
        //     },
        // });
    }
}

export { CategoryService };
