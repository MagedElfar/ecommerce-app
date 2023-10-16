import { promises } from "dns";
import { CreateProductCategoryDto } from "../dto/productCategory.dto";
import { ProductCategoryAttributes } from "../models/productCategory.model";
import ProductCategoryRepository from "../repositories/productCategory.repository";
import { BadRequestError, ForbiddenError, NotFoundError } from "../utility/errors";
import CategoryServices from "./category.services";
import ProductServices from "./product.services";

export interface IProductCategoryServices {
    create(userId: number, createProductCategoryDto: CreateProductCategoryDto): Promise<ProductCategoryAttributes>;
    findOne(data: Partial<ProductCategoryAttributes>): Promise<ProductCategoryAttributes | null>;
    delete(userId: number, id: number): Promise<void>
}

export default class ProductCategoryServices implements IProductCategoryServices {

    private readonly productServices: ProductServices;
    private readonly categoryServices: CategoryServices;
    private readonly productCategoryRepository: ProductCategoryRepository

    constructor(
        productCategoryRepository: ProductCategoryRepository,
        productServices: ProductServices,
        categoryServices: CategoryServices
    ) {
        this.productServices = productServices;
        this.categoryServices = categoryServices;
        this.productCategoryRepository = productCategoryRepository
    }

    async create(userId: number, createProductCategoryDto: CreateProductCategoryDto): Promise<ProductCategoryAttributes> {
        try {
            const product = await this.productServices.findById(createProductCategoryDto.productId);

            if (!product) throw new NotFoundError("product not exist");

            if (userId !== product.userId) throw new ForbiddenError("Forbidden")

            const category = await this.categoryServices.findOne({ id: createProductCategoryDto.categoryId });

            if (!category) throw new NotFoundError("category not exist");

            const record = await this.findOne({
                productId: createProductCategoryDto.productId,
                categoryId: createProductCategoryDto.categoryId
            })

            if (record) throw new BadRequestError("product is already assign to this category")

            return await this.productCategoryRepository.create(createProductCategoryDto)
        } catch (error) {
            throw error
        }
    }

    async findOne(data: Partial<ProductCategoryAttributes>): Promise<ProductCategoryAttributes | null> {
        try {
            return await this.productCategoryRepository.findOne(data)
        } catch (error) {
            throw error
        }
    }

    async delete(userId: number, id: number): Promise<void> {
        try {
            const record = await this.findOne({ id });

            if (!record) throw new NotFoundError();

            const product = await this.productServices.findById(record.productId)

            if (product?.userId !== userId) throw new ForbiddenError();

            await this.productCategoryRepository.delete({ id });

            return;

        } catch (error) {
            throw error;
        }
    }
}