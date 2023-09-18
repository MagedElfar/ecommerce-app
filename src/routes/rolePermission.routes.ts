import { Router } from "express"
import validation from "./../middlewares/validation.middleware"
import { Dependencies } from '../utility/diContainer';
import * as rolePermissionValidation from "./../validations/rolePermission.validation"
import rolePermissionDIContainer from "../dependencies/rolePermission.dependencies";
import { RolePermissionController } from "../controllers/rolePermission.controllers";
import permissionMiddleware from "../middlewares/permission.middleware";

const router = Router();

const rolePermissionController: RolePermissionController = rolePermissionDIContainer.resolve(Dependencies.RolePermissionController)

router.get(
    "/",
    permissionMiddleware("get all permissions"),
    rolePermissionController.getAllRolePermissionHandler.bind(rolePermissionController)
)

router.post(
    "/",
    validation(rolePermissionValidation.createRolePermissionSchema),
    permissionMiddleware("assign role permission"),
    rolePermissionController.createRolePermissionHandler.bind(rolePermissionController)
)



export default router;  