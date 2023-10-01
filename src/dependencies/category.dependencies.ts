import DIContainer, { Dependencies } from "../utility/diContainer";
import { Logger } from "../utility/logger";
import CategoryRepository from '../repositories/category.repository';
import CategoryServices from '../services/category.services';
import { CategoryController } from '../controllers/category.controllers';

const categoryDIContainer = new DIContainer();

categoryDIContainer.register(Dependencies.Logger, new Logger())

//repository dependencies
categoryDIContainer.register(Dependencies.CategoryRepository, new CategoryRepository());

//services dependencies
categoryDIContainer.register(Dependencies.CategoryServices, new CategoryServices(
    categoryDIContainer.resolve(Dependencies.CategoryRepository)
));

//controllers dependencies
categoryDIContainer.register(Dependencies.CategoryController, new CategoryController(
    categoryDIContainer.resolve(Dependencies.CategoryServices),
    categoryDIContainer.resolve(Dependencies.Logger)
))

export default categoryDIContainer;