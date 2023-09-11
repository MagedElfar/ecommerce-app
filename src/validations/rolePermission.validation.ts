import Joi from "joi";

const createRolePermissionSchema = Joi.object({

    roleId: Joi.number().required(),
    permissionId: Joi.number().required(),
})

export {
    createRolePermissionSchema
}