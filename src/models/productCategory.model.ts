import { Model, DataTypes, Optional } from "sequelize";
import DatabaseConfig from "../db";
import Product, { ProductAttributes } from "./product.model";
import Category, { CategoryAttributes } from "./category.model";

export interface ProductCategoryAttributes {
    id: number;
    categoryId: number;
    productId: number;
    product?: ProductAttributes;
    category?: CategoryAttributes
}

interface ProductCategoryCreationAttributes extends Optional<ProductCategoryAttributes, "id"> { }

class ProductCategory extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes> implements ProductCategoryAttributes {
    public id!: number;
    public categoryId!: number;
    public productId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProductCategory.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize: DatabaseConfig.sequelize,
        tableName: "product_category",
        timestamps: true, // Enable timestamps for createdAt and updatedAt
        createdAt: "createdAt", // Customize the name of the createdAt field
        updatedAt: "updatedAt", // Customize the name of the updatedAt field
    }
);

ProductCategory.belongsTo(Product, { as: "product", foreignKey: "productId", onDelete: "CASCADE" })
ProductCategory.belongsTo(Category, { as: "category", foreignKey: "categoryId", onDelete: "CASCADE" })


export default ProductCategory;
