import { FindOptions } from "sequelize";
import { FindManyOptions } from "./genericRepository";
import RolePermission, { RolePermissionAttributes } from "../models/rolePermission.model";
import { InternalServerError } from "../utility/errors";
import GenericRepository from "./genericRepository";
import Role from "../models/role.model";
import Permission from "../models/permission.model";

export default class RolePermissionRepository extends GenericRepository<RolePermission, RolePermissionAttributes> {

    constructor() {
        super(RolePermission)
    }

    public async findMany(options: FindManyOptions<RolePermission> = {}): Promise<RolePermissionAttributes[]> {
        try {
            const queryOptions: FindOptions = {};

            if (options.where && Object.keys(options.where).length > 0) {
                queryOptions.where = options.where;
            }

            if (options.order) {
                queryOptions.order = options.order
            }

            if (options.offset !== undefined) {
                queryOptions.offset = options.offset;
            }

            if (options.limit !== undefined) {
                queryOptions.limit = options.limit;
            }

            const models = await this.model.findAll({
                ...queryOptions,
                include: [
                    {
                        model: Role,
                        attributes: ["name"],
                        as: "role",
                    },
                    {
                        model: Permission,
                        attributes: ["name"],
                        as: "permission",
                    }
                ]
            });


            return models.map((model) => model.dataValues);
        } catch (error: any) {
            this.logger.error("database error", null, error);
            throw new InternalServerError("database error");
        }
    }


}