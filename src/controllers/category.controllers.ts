// src/controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/responseHelpers";
import { ILogger } from "../utility/logger";
import { ICategoryServices } from "../services/category.services";
import { NotFoundError } from "../utility/errors";

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

    async updateCategoryHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params

            const category = await this.categoryServices.update(+id, req.body);

            if (!category) throw new NotFoundError("category not exist")

            this.logger.info("update category", req, {
                user: {
                    name: req.user?.name,
                    email: req.user?.email,
                    role: req.user?.role?.name
                },

                category
            })

            sendResponse(res, {
                category
            }, 200)

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

    async deleteCategoryHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params

            const category = await this.categoryServices.findOne({ id: +id });

            if (!category) throw new NotFoundError("category not exist");

            await this.categoryServices.delete(+id)

            this.logger.info("delete category", req, {
                user: {
                    name: req.user?.name,
                    email: req.user?.email,
                    role: req.user?.role?.name
                },

                category
            })

            sendResponse(res, {}, 200)

        } catch (error) {
            next(error)
        }

    }
}
