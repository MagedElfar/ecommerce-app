import Joi from "joi";

const updateSchema = Joi.object({

    name: Joi.string().optional(),

    email: Joi.string().email().required(),
})

const updateUserRoleSchema = Joi.object({
    roleId: Joi.number().required(),
})

export {
    updateSchema,
    updateUserRoleSchema
}