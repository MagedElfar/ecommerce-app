import Joi from "joi";
import { Roles } from "../models/role.model";

const createRoleSchema = Joi.object({

    name: Joi.string().required().valid(...Object.values(Roles)),
})

export {
    createRoleSchema
}