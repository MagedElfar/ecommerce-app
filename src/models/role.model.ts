import { Model, DataTypes, Optional } from "sequelize";
import DatabaseConfig from "../db";

export enum Roles {
    ADMIN = "admin",
    VENDOR = "vendor",
    CUSTOMER = "customer"
}

export interface RoleAttributes {
    id: number;
    name: Roles;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> { }

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public id!: number;
    public name!: Roles;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.ENUM(...Object.values(Roles)),
            allowNull: false
        }
    },
    {
        sequelize: DatabaseConfig.sequelize,
        tableName: "Roles",
        timestamps: true, // Enable timestamps for createdAt and updatedAt
        createdAt: "createdAt", // Customize the name of the createdAt field
        updatedAt: "updatedAt", // Customize the name of the updatedAt field
    }
);


export default Role;
