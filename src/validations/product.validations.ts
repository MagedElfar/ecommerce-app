import Joi from "joi";

const createProductSchema = Joi.object({

    name: Joi.string().required(),

    price: Joi.number().required(),

    description: Joi.string().required()
})

export {
    createProductSchema
}