import { PermissionController } from './../controllers/permission.controllers';
import PermissionRepository from "../repositories/permission.repository";
import PermissionServices from "../services/permission.services";
import DIContainer, { Dependencies } from "../utility/diContainer";
import { Logger } from "../utility/logger";

const permissionDIContainer = new DIContainer();

permissionDIContainer.register(Dependencies.Logger, new Logger())

//repository dependencies
permissionDIContainer.register(Dependencies.PermissionRepository, new PermissionRepository());

//services dependencies
permissionDIContainer.register(Dependencies.PermissionServices, new PermissionServices(
    permissionDIContainer.resolve(Dependencies.PermissionRepository)
));

//controllers dependencies
permissionDIContainer.register(Dependencies.PermissionController, new PermissionController(
    permissionDIContainer.resolve(Dependencies.PermissionServices),
    permissionDIContainer.resolve(Dependencies.Logger)
))

export default permissionDIContainer;