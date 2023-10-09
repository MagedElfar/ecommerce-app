import Joi from "joi";

const createProductCategorySchema = Joi.object({
    productId: Joi.number().required(),
    categoryId: Joi.number().required(),

})

export {
    createProductCategorySchema
}