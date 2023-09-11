import Role from "../models/role.model";
import User from "../models/user.model";
import { InternalServerError } from "../utility/errors";
import GenericRepository from "./genericRepository";

export default class UserRepository extends GenericRepository<User, UserAttributes> {

    constructor() {
        super(User)
    }

    async findById(id: number): Promise<UserAttributes | null> {
        try {
            const model = await this.model.findByPk(id, {
                include: [
                    {
                        model: Role,
                        attributes: ["name"],
                        as: "role",
                    },
                ]
            })

            if (!model) return null

            return model.dataValues
        } catch (error: any) {
            this.logger.error("database error", null, error?.stack || error?.message || error)
            throw new InternalServerError("database error")
        }

    }

}