import ProductAttributes, { ProductAttrAttributes } from "../models/productAttributes.model";
import GenericRepository from "./genericRepository";

export default class ProductAttributesRepository extends GenericRepository<ProductAttributes, ProductAttrAttributes> {

    constructor() {
        super(ProductAttributes)
    }
}