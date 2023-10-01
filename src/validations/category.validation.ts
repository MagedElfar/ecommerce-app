import Joi from "joi";

const createCategorySchema = Joi.object({
    name: Joi.string().required(),
})

const getCategoriesSchema = Joi.object({
    name: Joi.string().optional(),
    limit: Joi.number().optional(),
    offset: Joi.number().optional()
})

export {
    createCategorySchema,
    getCategoriesSchema
}