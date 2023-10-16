import Joi from "joi";

const createAttributeSchema = Joi.object({

    name: Joi.string().required(),

    value: Joi.string().required()
})

export {
    createAttributeSchema
}