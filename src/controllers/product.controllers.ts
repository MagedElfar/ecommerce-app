import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/responseHelpers";
import { IProductServices } from "../services/product.services";
import { NotFoundError } from "../utility/errors";
import { IProductMediaServices } from "../services/productMedia.services";
import { IProductAttributeServices } from "../services/productAttributes.services";
import { CreateAttributeDto } from "../dto/productAttributes.dto";
import { ProductAttributes } from "../models/product.model";

export class ProductController {

    private readonly productServices: IProductServices;
    private readonly productAttributeServices: IProductAttributeServices;
    private readonly productMediaServices: IProductMediaServices;

    constructor(
        productServices: IProductServices,
        productAttributeServices: IProductAttributeServices,
        productMediaServices: IProductMediaServices,
    ) {
        this.productServices = productServices;
        this.productAttributeServices = productAttributeServices;
        this.productMediaServices = productMediaServices
    }


    async createProductHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { attributes = [], ...others } = req.body
            let product: ProductAttributes | null;

            product = await this.productServices.create({
                ...others,
                userId: req.user?.id
            });

            await this.productMediaServices.create(req, product.id, true);

            await Promise.all(attributes.map(async (attr: CreateAttributeDto) => {
                await this.productAttributeServices.create({
                    ...attr,
                    productId: product!.id
                })
            }))

            product = await this.productServices.findById(product.id)

            sendResponse(res, {
                product
            }, 201)

        } catch (error) {
            next(error)
        }

    }

    async getProductHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params

            const product = await this.productServices.findById(+id)

            if (!product) throw new NotFoundError("Product not exists")

            sendResponse(res, {
                product
            }, 200)

        } catch (error) {
            next(error)
        }

    }

    async deleteProductHandler(req: Request, res: Response, next: NextFunction) {

        try {

            const { id } = req.params

            const product = await this.productServices.findById(+id)

            if (!product) throw new NotFoundError("Product not exists")

            await Promise.all(product.media!.map(async (media) => {
                await this.productMediaServices.delete(media.id)
            }))


            await this.productServices.delete(product.id)

            sendResponse(res, {}, 200)

        } catch (error) {
            next(error)
        }

    }
}
