import Permission, { PermissionAttributes } from "../models/permission.model";
import GenericRepository from "./genericRepository";

export default class PermissionRepository extends GenericRepository<Permission, PermissionAttributes> {

    constructor() {
        super(Permission)
    }

}