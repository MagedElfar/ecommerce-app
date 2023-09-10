// src/models/User.ts
import { Model, DataTypes, Optional } from "sequelize";
import DatabaseConfig from "../db";

export interface PermissionAttributes {
    id: number;
    name: string;
}

interface PermissionCreationAttributes extends Optional<PermissionAttributes, "id"> { }

class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
    public id!: number;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Permission.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: DatabaseConfig.sequelize,
        tableName: "PermissionS",
        timestamps: true, // Enable timestamps for createdAt and updatedAt
        createdAt: "createdAt", // Customize the name of the createdAt field
        updatedAt: "updatedAt", // Customize the name of the updatedAt field
    }
);


export default Permission;
