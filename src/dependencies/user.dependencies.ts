import { UserController } from "../controllers/user.controllers";
import RoleRepository from "../repositories/role.repository";
import UserRepository from "../repositories/user.repository";
import RoleServices from "../services/role.services";
import UserServices from "../services/user.services";
import DIContainer, { Dependencies } from "../utility/diContainer";
import { Logger } from "../utility/logger";

const userDIContainer = new DIContainer();

userDIContainer.register(Dependencies.Logger, new Logger())

//repository dependencies
userDIContainer.register(Dependencies.UserRepository, new UserRepository());
userDIContainer.register(Dependencies.RoleRepository, new RoleRepository())

//services dependencies
userDIContainer.register(Dependencies.UserServices, new UserServices(
    userDIContainer.resolve(Dependencies.UserRepository)
));

userDIContainer.register(Dependencies.UserServices, new UserServices(
    userDIContainer.resolve(Dependencies.UserRepository)
));

userDIContainer.register(Dependencies.RoleServices, new RoleServices(
    userDIContainer.resolve(Dependencies.RoleRepository)
));

//controllers dependencies
userDIContainer.register(Dependencies.UserController, new UserController(
    userDIContainer.resolve(Dependencies.UserServices),
    userDIContainer.resolve(Dependencies.RoleServices),
    userDIContainer.resolve(Dependencies.Logger)
))

export default userDIContainer;