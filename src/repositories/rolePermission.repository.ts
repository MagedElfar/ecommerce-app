import RolePermission, { RolePermissionAttributes } from "../models/rolePermission.model";
import GenericRepository from "./genericRepository";

export default class RolePermissionRepository extends GenericRepository<RolePermission, RolePermissionAttributes> {

    constructor() {
        super(RolePermission)
    }

}