import { Model, DataTypes, Optional } from "sequelize";
import DatabaseConfig from "../db";
import Permission, { PermissionAttributes } from "./permission.model";
import Role, { RoleAttributes } from "./role.model";

export interface RolePermissionAttributes {
    id: number;
    roleId: number;
    permissionId: number;
    role?: RoleAttributes;
    permission?: PermissionAttributes
}

interface RolePermissionCreationAttributes extends Optional<RolePermissionAttributes, "id"> { }

class RolePermission extends Model<RolePermissionAttributes, RolePermissionCreationAttributes> implements RolePermissionAttributes {
    public id!: number;
    public roleId!: number;
    public permissionId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RolePermission.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        permissionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize: DatabaseConfig.sequelize,
        tableName: "role_permission",
        timestamps: true, // Enable timestamps for createdAt and updatedAt
        createdAt: "createdAt", // Customize the name of the createdAt field
        updatedAt: "updatedAt", // Customize the name of the updatedAt field
    }
);

RolePermission.belongsTo(Role, { as: "role", foreignKey: "roleId", onDelete: "CASCADE" })
RolePermission.belongsTo(Permission, { as: "permission", foreignKey: "permissionId", onDelete: "CASCADE" })

export default RolePermission;
