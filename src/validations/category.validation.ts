import Joi from "joi";

const createCategorySchema = Joi.object({

    name: Joi.string().required(),
})

export {
    createCategorySchema
}