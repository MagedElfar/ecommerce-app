import GenericRepository, { FindManyOptions } from "./genericRepository";
import Category, { CategoryAttributes } from "../models/category.model";
import { FindOptions } from "sequelize";
import { InternalServerError } from "../utility/errors";

export default class CategoryRepository extends GenericRepository<Category, CategoryAttributes> {

    constructor() {
        super(Category)
    }

    public async findMany(options: FindManyOptions<Category> = {}): Promise<{
        count: number, data: CategoryAttributes[]
    }> {
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

            const count = await this.model.count({
                where: queryOptions.where,
            });

            const data = models.map((model) => model.dataValues);

            return {
                data, count
            }
        } catch (error: any) {
            this.logger.error("database error", null, error);
            throw new InternalServerError("database error");
        }
    }


}