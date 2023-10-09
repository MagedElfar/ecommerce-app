import ProductCategoryController from './../controllers/productCategory.controllers';
import { Router } from "express"
import validation from "./../middlewares/validation.middleware"
import { Dependencies } from '../utility/diContainer';
import * as productCategory from "./../validations/productCategory.validations";
import productCategoryDIContainer from '../dependencies/productCategory.dependencies';

const productCategoryRouter = Router();

const productCategoryController: ProductCategoryController = productCategoryDIContainer.resolve(
    Dependencies.ProductCategoryController
)

productCategoryRouter.post(
    "/",
    validation(productCategory.createProductCategorySchema),
    productCategoryController.assignCategoryHandler.bind(productCategoryController)
)




export default productCategoryRouter; 