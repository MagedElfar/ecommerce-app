import Joi, { LanguageMessages } from "joi";
import { createAttributeSchema } from "./productAttributes.validation"

const createProductSchema = Joi.object({



    name: Joi.string().when('parentId', {
        is: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.required()
    }),

    price: Joi.number().when('parentId', {
        is: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.required()
    }),

    description: Joi.string().when('parentId', {
        is: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.required()
    }),

    sku: Joi.string().required(),

    parentId: Joi.number().optional(),

    attributes: Joi.array()
        .items(createAttributeSchema) // Validate each attribute object using createAttributeSchema
        .optional()
        .messages({
            'attributes.custom': 'Custom error message for the attributes field',
        })
    // .custom((value, helpers) => {
    //     console.log("value = ", value)
    //     return JSON.stringify(value);

    //     // // Use .map() to convert items in the array to objects
    //     // const objects = value.map((item: string) => {
    //     //     console.log("item = ", typeof (JSON.stringify(item)))
    //     // })
    // })
})
    .messages({
        'attributes.*.name': 'attributes.*.name is required',
        'attributes.*.value': '"{{#label}}" is required',
    });




export {
    createProductSchema
}