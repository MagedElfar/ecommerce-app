import Joi from "joi";

const createRolePermissionSchema = Joi.object({

    RoleId: Joi.number().required(),
    PermissionId: Joi.number().required(),
})

export {
    createRolePermissionSchema
}