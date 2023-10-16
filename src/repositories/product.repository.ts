import Product, { ProductAttributes } from "../models/product.model";
import ProductAttributesModel from "../models/productAttributes.model";
import ProductMedia from "../models/productMedia.model";
import User from "../models/user.model";
import { InternalServerError } from "../utility/errors";
import GenericRepository from "./genericRepository";

export default class ProductRepository extends GenericRepository<Product, ProductAttributes> {

    constructor() {
        super(Product)
    }

    async findById(id: number): Promise<ProductAttributes | null> {
        try {
            const model = await this.model.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: ["id", "name", "email"],
                        as: "user",
                    },
                    {
                        model: Product,
                        as: "parent",
                        required: false
                    },
                    {
                        model: ProductMedia,
                        as: "media",
                        required: false,
                    },
                    {
                        model: ProductAttributesModel,
                        as: "attributes",
                        required: false
                    },
                    {
                        model: Product,
                        as: "products",
                        include: [
                            {
                                model: User,
                                attributes: ["id", "name", "email"],
                                as: "user",
                            },
                            {
                                model: ProductMedia,
                                as: "media",
                                required: false,
                            },
                            {
                                model: ProductAttributesModel,
                                as: "attributes",
                                required: false
                            },
                        ],
                        required: false
                    },


                ]
            })

            if (!model) return null


            return model.dataValues
        } catch (error: any) {
            this.logger.error("database error", null, error?.stack || error?.message || error)
            throw new InternalServerError("database error")
        }

    }
}