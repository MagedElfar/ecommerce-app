import { RoleController } from "../controllers/role.controllers";
import RoleRepository from "../repositories/role.repository";
import RoleServices from "../services/role.services";
import DIContainer, { Dependencies } from "../utility/diContainer";
import { Logger } from "../utility/logger";

const roleDIContainer = new DIContainer();

roleDIContainer.register(Dependencies.Logger, new Logger())

//repository dependencies
roleDIContainer.register(Dependencies.RoleRepository, new RoleRepository());

//services dependencies
roleDIContainer.register(Dependencies.RoleServices, new RoleServices(
    roleDIContainer.resolve(Dependencies.RoleRepository)
));

//controllers dependencies
roleDIContainer.register(Dependencies.RoleController, new RoleController(
    roleDIContainer.resolve(Dependencies.RoleServices),
    roleDIContainer.resolve(Dependencies.Logger)
))

export default roleDIContainer;