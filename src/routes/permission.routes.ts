import { Router } from "express"
import validation from "./../middlewares/validation.middleware"
import { Dependencies } from '../utility/diContainer';
import * as permissionValidation from "./../validations/permission.validation"
import { PermissionController } from "../controllers/permission.controllers";
import permissionDIContainer from "../dependencies/permission.dependencies";

const router = Router();

const permissionController: PermissionController = permissionDIContainer.resolve(Dependencies.PermissionController)

router.post(
    "/",
    validation(permissionValidation.createPermissionSchema),
    permissionController.createPermissionHandler.bind(permissionController)
)



export default router; 