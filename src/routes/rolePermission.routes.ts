import { Router } from "express"
import validation from "./../middlewares/validation.middleware"
import { Dependencies } from '../utility/diContainer';
import * as rolePermissionValidation from "./../validations/rolePermission.validation"
import rolePermissionDIContainer from "../dependencies/rolePermission.dependencies";
import { RolePermissionController } from "../controllers/rolePermission.controllers";

const router = Router();

const rolePermissionController: RolePermissionController = rolePermissionDIContainer.resolve(Dependencies.RolePermissionController)

router.post(
    "/",
    validation(rolePermissionValidation.createRolePermissionSchema),
    rolePermissionController.createRolePermissionHandler.bind(rolePermissionController)
)



export default router;  