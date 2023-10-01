// src/controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/responseHelpers";
import { ILogger } from "../utility/logger";
import { ICategoryServices } from "../services/category.services";

export class CategoryController {

    private categoryServices: ICategoryServices
    private logger: ILogger;

    constructor(categoryServices: ICategoryServices, logger: ILogger) {
        this.categoryServices = categoryServices;
        this.logger = logger
    }

    async createCategoryHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const category = await this.categoryServices.create(req.body);

            this.logger.info("Create a new category", req, {
                user: {
                    name: req.user?.name,
                    email: req.user?.email,
                    role: req.user?.role?.name
                },

                category
            })

            sendResponse(res, {
                category
            }, 201)

        } catch (error) {
            next(error)
        }

    }

    async getCategoriesHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const categories = await this.categoryServices.findMany(req.query);

            sendResponse(res, {
                categories
            }, 200)

        } catch (error) {
            next(error)
        }

    }
}
