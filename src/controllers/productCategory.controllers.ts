// src/controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/responseHelpers";
import { ILogger } from "../utility/logger";
import { IProductCategoryServices } from "../services/productCategory.services";

export default class ProductCategoryController {

    private productCategoryServices: IProductCategoryServices
    private logger: ILogger;

    constructor(productCategoryServices: IProductCategoryServices, logger: ILogger) {
        this.productCategoryServices = productCategoryServices;
        this.logger = logger
    }

    async assignCategoryHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const data = await this.productCategoryServices.create(req.user?.id!, req.body);

            sendResponse(res, {
                data
            }, 201)

        } catch (error) {
            next(error)
        }

    }

    async unassignCategoryHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params

            const data = await this.productCategoryServices.delete(req.user?.id!, +id!);

            sendResponse(res, {}, 200)

        } catch (error) {
            next(error)
        }

    }
}
