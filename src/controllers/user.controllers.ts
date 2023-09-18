// src/controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/responseHelpers";
import { IUserServices } from "../services/user.services";
import { ILogger } from "../utility/logger";
import { NotFoundError } from "../utility/errors";
import { IRoleServices } from "../services/role.services";

export class UserController {

    private userServices: IUserServices
    private roleServices: IRoleServices
    private logger: ILogger;

    constructor(userServices: IUserServices, roleServices: IRoleServices, logger: ILogger) {
        this.userServices = userServices;
        this.roleServices = roleServices
        this.logger = logger
    }

    async getUserByIdHandler(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params

            const user = await this.userServices.findUserById(+id)

            if (!user) throw new NotFoundError("user doesn't exist")

            sendResponse(res, {
                user
            }, 200)

        } catch (error) {
            next(error)
        }

    }

    async createUserHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const user = await this.userServices.createUser(req.body)

            sendResponse(res, {
                user
            }, 201)

        } catch (error) {
            next(error)
        }

    }

    async updateUserHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params

            const userId = id || req.user?.id!

            const user = await this.userServices.updateUser(+userId, req.body)

            sendResponse(res, {
                user
            }, 200)

        } catch (error) {
            next(error)
        }

    }


    async updateUserRoleHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const role = await this.roleServices.findById(req.body.roleId);

            if (!role) throw new NotFoundError("role doesn't exist")

            const user = await this.userServices.updateUserRole(+req.params.id!, req.body)

            this.logger.info("update user role", null, {
                userDoUpdate: {
                    name: req.user?.name,
                    email: req.user?.email,
                },

                userUpdated: {
                    name: user?.name,
                    email: user?.email,
                    role: user?.role?.name
                }
            })
            sendResponse(res, {}, 200)

        } catch (error) {
            next(error)
        }

    }

    async deleteUserHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params

            const userId = id || req.user?.id!


            const user = await this.userServices.findUserById(+id);

            if (!user) throw new NotFoundError("user note exist")

            const isDeleted = await this.userServices.deleteUser(+userId);

            if (!isDeleted) throw new NotFoundError("user note exist");

            this.logger.info("delete user", null, {
                user: {
                    name: req.user?.name,
                    email: req.user?.email
                },
                deletedUser: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            })

            sendResponse(res, {}, 200)

        } catch (error) {
            next(error)
        }

    }
}
