import Joi from "joi";

const createPermissionSchema = Joi.object({

    name: Joi.string().required(),
})

export {
    createPermissionSchema
}