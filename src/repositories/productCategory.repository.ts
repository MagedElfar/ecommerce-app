import GenericRepository from "./genericRepository";
import ProductCategory, { ProductCategoryAttributes } from "../models/productCategory.model";
export default class ProductCategoryRepository extends GenericRepository<ProductCategory, ProductCategoryAttributes> {

    constructor() {
        super(ProductCategory)
    }

}