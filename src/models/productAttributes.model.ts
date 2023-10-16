import { Model, DataTypes, Optional } from "sequelize";
import DatabaseConfig from "../db";
import User from "./user.model";
import { ProductMediaAttributes } from "./productMedia.model";
import Product from "./product.model";

export interface ProductAttrAttributes {
    id: number;
    name: string;
    value: string;
    productId: number
    product?: ProductAttributes

}

interface ProductCreationAttributes extends Optional<ProductAttrAttributes, "id"> { }

class ProductAttributes extends Model<ProductAttrAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public value!: string;
    public name!: string;
    public productId: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProductAttributes.init(
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
        value: {
            type: DataTypes.STRING,
        },
        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize: DatabaseConfig.sequelize,
        tableName: "products_attributes",
        timestamps: true, // Enable timestamps for createdAt and updatedAt
        createdAt: "createdAt", // Customize the name of the createdAt field
        updatedAt: "updatedAt", // Customize the name of the updatedAt field
    }
);

ProductAttributes.belongsTo(Product, { as: "product", foreignKey: "productId", onDelete: "CASCADE" })

Product.hasMany(ProductAttributes, { as: "attributes", foreignKey: "productId" })


export default ProductAttributes;  