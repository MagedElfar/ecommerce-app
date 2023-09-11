import { Paths } from "swagger-jsdoc"
import authPath from "./auth.path"
import userPath from "./user.path"
import productPath from "./product.path"
import rolePath from "./role.path"
import permissionPath from "./permission.path"
import rolePermissionPath from "./rolePermission.path"

const paths: Paths = {
    ...authPath,
    ...userPath,
    ...rolePath,
    ...permissionPath,
    ...productPath,
    ...rolePermissionPath
}

export default paths