// src/models/User.ts
import { Model, DataTypes, Optional } from "sequelize";
import DatabaseConfig from "./../db";
import Role, { RoleAttributes } from "./role.model";

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    roleId?: number;
    role?: RoleAttributes;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public password: string;
    public id!: number;
    public name!: string;
    public email!: string;
    public roleId: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        }

    },
    {
        sequelize: DatabaseConfig.sequelize,
        tableName: "users",
        timestamps: true, // Enable timestamps for createdAt and updatedAt
        createdAt: "createdAt", // Customize the name of the createdAt field
        updatedAt: "updatedAt", // Customize the name of the updatedAt field
    }
);

User.belongsTo(Role, { as: "role", foreignKey: "roleId", onDelete: "SET NULL" })
Role.hasMany(User, { as: "users", foreignKey: "roleId" })

export default User;
