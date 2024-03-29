// src/controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/responseHelpers";
import { ILogger } from "../utility/logger";
import { IRoleServices } from "../services/role.services";
import { IRolePermissionServices } from "../services/rolePermission.services";
import { NotFoundError } from "../utility/errors";

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

    async getAllRolePermissionHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const rolePermission = await this.rolePermissionServices.findMany();

            sendResponse(res, {
                rolePermission
            }, 200)

        } catch (error) {
            next(error)
        }

    }

    async removePermissionHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params;

            const rolePermission = await this.rolePermissionServices.findOne({
                id: +id
            })

            if (!rolePermission) throw new NotFoundError("no assign permission found");

            await this.rolePermissionServices.remove(+id);

            this.logger.info("remove assign permission", req, {
                user: {
                    name: req.user?.name,
                    email: req.user?.email
                },

                rolePermission
            })

            sendResponse(res, {}, 200)

        } catch (error) {
            next(error)
        }

    }

}
