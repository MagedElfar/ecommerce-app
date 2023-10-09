import DIContainer, { Dependencies } from "../utility/diContainer";
import { Logger } from "../utility/logger";
import CategoryRepository from '../repositories/category.repository';
import CategoryServices from '../services/category.services';
import { CategoryController } from '../controllers/category.controllers';
import ProductCategoryRepository from "../repositories/productCategory.repository";
import ProductServices from "../services/product.services";
import ProductRepository from "../repositories/product.repository";
import ProductCategoryServices from "../services/productCategory.services";
import ProductCategoryController from "../controllers/productCategory.controllers";

const productCategoryDIContainer = new DIContainer();

productCategoryDIContainer.register(Dependencies.Logger, new Logger())

//repository dependencies
productCategoryDIContainer.register(Dependencies.ProductCategoryRepository, new ProductCategoryRepository());

//services dependencies
productCategoryDIContainer.register(Dependencies.CategoryServices, new CategoryServices(
    new CategoryRepository()
));

productCategoryDIContainer.register(Dependencies.ProductServices, new ProductServices(
    new ProductRepository()
));

productCategoryDIContainer.register(Dependencies.ProductCategoryServices, new ProductCategoryServices(
    productCategoryDIContainer.resolve(Dependencies.ProductCategoryRepository),
    productCategoryDIContainer.resolve(Dependencies.ProductServices),
    productCategoryDIContainer.resolve(Dependencies.CategoryServices)
))


//controllers dependencies
productCategoryDIContainer.register(Dependencies.ProductCategoryController, new ProductCategoryController(
    productCategoryDIContainer.resolve(Dependencies.ProductCategoryServices),
    productCategoryDIContainer.resolve(Dependencies.Logger)
))

export default productCategoryDIContainer;