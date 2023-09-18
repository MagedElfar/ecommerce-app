import { Router } from "express"
import validation from "./../middlewares/validation.middleware"
import { Dependencies } from '../utility/diContainer';
import * as permissionValidation from "./../validations/permission.validation"
import { PermissionController } from "../controllers/permission.controllers";
import permissionDIContainer from "../dependencies/permission.dependencies";
import permissionMiddleware from "../middlewares/permission.middleware";

const router = Router();

const permissionController: PermissionController = permissionDIContainer.resolve(Dependencies.PermissionController)

router.get(
    "/",
    permissionMiddleware("get all permissions"),
    permissionController.getPermissionsHandler.bind(permissionController)
)

router.post(
    "/",
    validation(permissionValidation.createPermissionSchema),
    permissionMiddleware("add new permission"),
    permissionController.createPermissionHandler.bind(permissionController)
)



export default router; 