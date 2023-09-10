import { PermissionController } from './../controllers/permission.controllers';
import PermissionRepository from "../repositories/permission.repository";
import PermissionServices, { IPermissionServices } from "../services/permission.services";
import DIContainer, { Dependencies } from "../utility/diContainer";
import { Logger } from "../utility/logger";
import RoleRepository from '../repositories/role.repository';
import RoleServices, { IRoleServices } from '../services/role.services';
import RolePermissionRepository from '../repositories/rolePermission.repository';
import RolePermissionServices, { IRolePermissionServices } from '../services/rolePermission.services';
import { RolePermissionController } from '../controllers/rolePermission.controllers';

const rolePermissionDIContainer = new DIContainer();

rolePermissionDIContainer.register(Dependencies.Logger, new Logger())

//repository dependencies
rolePermissionDIContainer.register(Dependencies.PermissionRepository, new PermissionRepository());

rolePermissionDIContainer.register(Dependencies.RolePermissionRepository, new RoleRepository());

rolePermissionDIContainer.register(Dependencies.RolePermissionRepository, new RolePermissionRepository());

//services dependencies
rolePermissionDIContainer.register<IPermissionServices>(Dependencies.PermissionServices, new PermissionServices(
    rolePermissionDIContainer.resolve(Dependencies.PermissionRepository)
));

rolePermissionDIContainer.register<IRoleServices>(Dependencies.RoleServices, new RoleServices(
    rolePermissionDIContainer.resolve(Dependencies.RoleServices)
));

rolePermissionDIContainer.register<IRolePermissionServices>(Dependencies.RolePermissionServices, new RolePermissionServices(
    rolePermissionDIContainer.resolve(Dependencies.RolePermissionRepository),
    rolePermissionDIContainer.resolve(Dependencies.RoleServices),
    rolePermissionDIContainer.resolve(Dependencies.PermissionServices)
));

//controllers dependencies
rolePermissionDIContainer.register(Dependencies.RolePermissionController, new RolePermissionController(
    rolePermissionDIContainer.resolve(Dependencies.RolePermissionServices),
    rolePermissionDIContainer.resolve(Dependencies.Logger)
))

export default rolePermissionDIContainer;