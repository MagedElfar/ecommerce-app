import { Router } from "express"
import validation from "./../middlewares/validation.middleware"
import { Dependencies } from '../utility/diContainer';
import { RoleController } from "../controllers/role.controllers";
import roleDIContainer from "../dependencies/role.dependencies";
import * as roleValidation from "./../validations/role.validation"

const router = Router();

const roleController: RoleController = roleDIContainer.resolve(Dependencies.RoleController)

// router.post("/", userController.createUserHandler.bind(userController))

router.get(
    "/",
    roleController.getRolesHandler.bind(roleController)
)

router.post(
    "/",
    validation(roleValidation.createRoleSchema),
    roleController.createRoleHandler.bind(roleController)
)



export default router; 