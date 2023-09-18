// src/controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/responseHelpers";
import { ILogger } from "../utility/logger";
import { IRoleServices } from "../services/role.services";

export class RoleController {

    private roleServices: IRoleServices
    private logger: ILogger;

    constructor(roleServices: IRoleServices, logger: ILogger) {
        this.roleServices = roleServices;
        this.logger = logger
    }

    async createRoleHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const role = await this.roleServices.create(req.body);

            this.logger.info("Create a new role", req, {
                user: {
                    name: req.user?.name,
                    email: req.user?.email
                },

                role
            })

            sendResponse(res, {
                role
            }, 201)

        } catch (error) {
            next(error)
        }

    }

    async getRolesHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const roles = await this.roleServices.findMany();

            this.logger.info("Get all roles", req, {
                user: {
                    name: req.user?.name,
                    email: req.user?.email
                },
            })

            sendResponse(res, {
                roles
            }, 200)

        } catch (error) {
            next(error)
        }

    }

}
