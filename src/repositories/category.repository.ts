import GenericRepository, { FindManyOptions } from "./genericRepository";
import Category, { CategoryAttributes } from "../models/category.model";
import { FindOptions } from "sequelize";
import { InternalServerError } from "../utility/errors";

export default class CategoryRepository extends GenericRepository<Category, CategoryAttributes> {

    constructor() {
        super(Category)
    }

    public async findMany(options: FindManyOptions<Category> = {}): Promise<CategoryAttributes[]> {
        try {
            const queryOptions: FindOptions = {};

            if (options.where && Object.keys(options.where).length > 0) {
                queryOptions.where = options.where;
            }

            if (options.order) {
                queryOptions.order = options.order
            }

            if (options.offset !== undefined && options.limit !== undefined) {
                queryOptions.offset = (options.offset - 1) * +options.limit;
            }

            if (options.limit !== undefined) {
                queryOptions.limit = +options.limit;
            }

            const models = await this.model.findAll({
                ...queryOptions,
            });


            return models.map((model) => model.dataValues);
        } catch (error: any) {
            this.logger.error("database error", null, error);
            throw new InternalServerError("database error");
        }
    }


}