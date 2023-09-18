import { UserController } from '../controllers/user.controllers';
import { Router } from "express"
import permissionMiddleware from '../middlewares/permission.middleware';
import * as userValidation from "./../validations/user.validations"
import validation from "./../middlewares/validation.middleware"
import { Dependencies } from '../utility/diContainer';
import userDIContainer from '../dependencies/user.dependencies';

const userRouter = Router();

const userController: UserController = userDIContainer.resolve(Dependencies.UserController)

userRouter.get(
    "/:id",
    userController.getUserByIdHandler.bind(userController)
)

userRouter.put(
    "/role/:id",
    validation(userValidation.updateUserRoleSchema),
    permissionMiddleware("update user role"),
    userController.updateUserRoleHandler.bind(userController)
)

userRouter.put(
    "/",
    validation(userValidation.updateSchema),
    userController.updateUserHandler.bind(userController)
)

userRouter.put(
    "/:id",
    validation(userValidation.updateSchema),
    permissionMiddleware("update user permission"),
    userController.updateUserHandler.bind(userController)
)

userRouter.delete(
    "/",
    permissionMiddleware("delete user permission"),
    userController.deleteUserHandler.bind(userController)
)

userRouter.delete(
    "/:id",
    permissionMiddleware("delete user permission"),
    userController.deleteUserHandler.bind(userController)
)


export default userRouter;