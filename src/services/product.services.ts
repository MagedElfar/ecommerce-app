import { CreateProductDto } from "../dto/product.dto";
import { ProductAttributes } from "../models/product.model";
import ProductRepository from "../repositories/product.repository";
import { BadRequestError, NotFoundError } from "../utility/errors";

export interface IProductServices {
    create(createProductDto: CreateProductDto): Promise<ProductAttributes>;
    findById(id: number): Promise<ProductAttributes | null>;
    findOne(data: Partial<ProductAttributes>): Promise<ProductAttributes | null>;
    delete(id: number): Promise<number>
}

export default class ProductServices implements IProductServices {

    private readonly productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async create(createProductDto: CreateProductDto): Promise<ProductAttributes> {
        try {

            let product = await this.findOne({ sku: createProductDto.sku })

            if (product) throw new BadRequestError("product sku is already exist")

            if (createProductDto.parentId) {
                product = await this.findOne({ id: createProductDto.parentId });
                if (!product) throw new NotFoundError("parent product not exist")
                product = await this.productRepository.create(createProductDto)
            } else {
                product = await this.productRepository.create(createProductDto)
            }

            return product!
        } catch (error) {
            throw error
        }
    }

    async findOne(data: Partial<ProductAttributes>): Promise<ProductAttributes | null> {
        try {
            const product = await this.productRepository.findOne(data)

            return product
        } catch (error) {
            throw error
        }
    }

    async findById(id: number): Promise<ProductAttributes | null> {
        try {
            const product = await this.productRepository.findById(id)

            return product
        } catch (error) {
            throw error
        }
    }

    async delete(id: number): Promise<number> {
        try {

            const isDeleted = await this.productRepository.delete({ id })

            return isDeleted;
        } catch (error) {
            throw error
        }
    }
}