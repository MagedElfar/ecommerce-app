// src/controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/responseHelpers";
import { ILogger } from "../utility/logger";
import { IPermissionServices } from "../services/permission.services";

export class PermissionController {

    private permissionServices: IPermissionServices
    private logger: ILogger;

    constructor(permissionServices: IPermissionServices, logger: ILogger) {
        this.permissionServices = permissionServices;
        this.logger = logger
    }

    async createPermissionHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const permission = await this.permissionServices.create(req.body);

            this.logger.info("Create a new permission", req, {
                user: {
                    name: req.user?.name,
                    email: req.user?.email
                },

                permission
            })

            sendResponse(res, {
                permission
            }, 201)

        } catch (error) {
            next(error)
        }

    }

    async getPermissionsHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const Permissions = await this.permissionServices.findMany();

            this.logger.info("Get all permissions", req, {
                user: {
                    name: req.user?.name,
                    email: req.user?.email
                },
            })

            sendResponse(res, {
                Permissions
            }, 200)

        } catch (error) {
            next(error)
        }

    }

}
