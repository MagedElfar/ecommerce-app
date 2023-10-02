import { Router } from "express"
import validation from "./../middlewares/validation.middleware"
import { Dependencies } from '../utility/diContainer';
import * as categoryValidation from "./../validations/category.validation"
import permissionMiddleware from "../middlewares/permission.middleware";
import { CategoryController } from "../controllers/category.controllers";
import categoryDIContainer from "../dependencies/category.dependencies";

const categoryRouter = Router();

const categoryController: CategoryController = categoryDIContainer.resolve(
    Dependencies.CategoryController
)

categoryRouter.get(
    "/",
    validation(categoryValidation.getCategoriesSchema, "query"),
    categoryController.getCategoriesHandler.bind(categoryController)
)

categoryRouter.post(
    "/",
    validation(categoryValidation.createCategorySchema),
    permissionMiddleware("add a new category"),
    categoryController.createCategoryHandler.bind(categoryController)
)

categoryRouter.put(
    "/:id",
    validation(categoryValidation.createCategorySchema),
    permissionMiddleware("update category"),
    categoryController.updateCategoryHandler.bind(categoryController)
)



export default categoryRouter; 