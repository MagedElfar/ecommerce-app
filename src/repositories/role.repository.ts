import Role, { RoleAttributes } from "../models/role.model";
import GenericRepository from "./genericRepository";

export default class RoleRepository extends GenericRepository<Role, RoleAttributes> {

    constructor() {
        super(Role)
    }

}