import { IPermissionServices } from './../services/permission.services';
import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../utility/errors";
import User from "../models/user.model";
import permissionDIContainer from "../dependencies/permission.dependencies";
import { Dependencies } from "../utility/diContainer";
import { Logger } from '../utility/logger';
import { IRolePermissionServices } from '../services/rolePermission.services';
import rolePermissionDIContainer from '../dependencies/rolePermission.dependencies';


export default function permissionMiddleware(permissionName: string) {

    return async (req: Request, res: Response, next: NextFunction) => {
        const logger = new Logger();
        const permissionServices: IPermissionServices = permissionDIContainer.resolve(Dependencies.PermissionServices)
        const user = req.user as User; // Cast req.user to User type

        const permission = await permissionServices.findOne({
            name: permissionName
        });

        if (!permission) {
            logger.error(`permission error "${permissionName}"`, req, {
                user: {
                    name: user.name,
                    email: user.email
                },
                error: "permission doesn't exist"
            })
            return next(new ForbiddenError("Forbidden"))
        }

        const rolePermissionServices: IRolePermissionServices = rolePermissionDIContainer.resolve(Dependencies.RolePermissionServices);

        const rolePermission = await rolePermissionServices.findOne({
            roleId: user.roleId,
            permissionId: permission.id
        });

        if (!rolePermission) {
            logger.error(`permission error "${permissionName}"`, req, {
                user: {
                    name: user.name,
                    email: user.email
                },
                error: "user doesn't have permission"
            })
            return next(new ForbiddenError("Forbidden"))
        }

        // if (req.user?.id !== +req.params.id && user.role !== Role.ADMIN)
        //     return next(new ForbiddenError("Forbidden"))

        next()
    }

}