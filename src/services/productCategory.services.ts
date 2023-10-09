import { CreateProductCategoryDto } from "../dto/productCategory.dto";
import { ProductCategoryAttributes } from "../models/productCategory.model";
import ProductCategoryRepository from "../repositories/productCategory.repository";
import { ForbiddenError, NotFoundError } from "../utility/errors";
import CategoryServices from "./category.services";
import ProductServices from "./product.services";

export interface IProductCategoryServices {
    create(userId: number, createProductCategoryDto: CreateProductCategoryDto): Promise<ProductCategoryAttributes>;
    // findById(id: number): Promise<ProductAttributes | null>;
    // delete(id: number): Promise<number>
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

            if (!category) throw new NotFoundError("category not exist")

            return await this.productCategoryRepository.create(createProductCategoryDto)
        } catch (error) {
            throw error
        }
    }

    // async findById(id: number): Promise<ProductAttributes | null> {
    //     try {
    //         const product = await this.productRepository.findById(id)

    //         return product
    //     } catch (error) {
    //         throw error
    //     }
    // }

    // async delete(id: number): Promise<number> {
    //     try {

    //         const isDeleted = await this.productRepository.delete({ id })

    //         return isDeleted;
    //     } catch (error) {
    //         throw error
    //     }
    // }
}