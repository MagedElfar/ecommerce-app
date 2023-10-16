import { CreateProductDto } from "../dto/product.dto";
import { CreateAttributeDto } from "../dto/productAttributes.dto";
import { ProductAttrAttributes } from "../models/productAttributes.model";
import ProductAttributesRepository from "../repositories/productAttributes.repository";

export interface IProductAttributeServices {
    create(createAttrDto: CreateAttributeDto): Promise<ProductAttrAttributes>;
}

export default class ProductAttributeServices implements IProductAttributeServices {

    private readonly productAttributesRepository: ProductAttributesRepository;

    constructor(productAttributesRepository: ProductAttributesRepository) {
        this.productAttributesRepository = productAttributesRepository
    }

    async create(createAttrDto: CreateAttributeDto): Promise<ProductAttrAttributes> {
        try {
            const attr = await this.productAttributesRepository.create(createAttrDto)

            return attr!
        } catch (error) {
            throw error
        }
    }
}