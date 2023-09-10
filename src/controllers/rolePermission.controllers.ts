// src/controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/responseHelpers";
import { ILogger } from "../utility/logger";
import { IRoleServices } from "../services/role.services";
import { IRolePermissionServices } from "../services/rolePermission.services";

export class RolePermissionController {

    private rolePermissionServices: IRolePermissionServices
    private logger: ILogger;

    constructor(rolePermissionServices: IRolePermissionServices, logger: ILogger) {
        this.rolePermissionServices = rolePermissionServices;
        this.logger = logger
    }

    async createRolePermissionHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const rolePermission = await this.rolePermissionServices.create(req.body);

            this.logger.info("Assign Permission to Role", req, {
                user: {
                    name: req.user?.name,
                    email: req.user?.email
                },

                rolePermission
            })

            sendResponse(res, {
                rolePermission
            }, 201)

        } catch (error) {
            next(error)
        }

    }

}
