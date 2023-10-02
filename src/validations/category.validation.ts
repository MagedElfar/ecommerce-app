import Joi from "joi";

const createCategorySchema = Joi.object({
    name: Joi.string().required(),
})

const updateCategorySchema = Joi.object({
    name: Joi.string().required(),
})

const getCategoriesSchema = Joi.object({
    name: Joi.string().optional(),
    offset: Joi.number().optional(),
    limit: Joi.number().when('offset', {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.optional()
    })
})

export {
    createCategorySchema,
    getCategoriesSchema,
    updateCategorySchema
}