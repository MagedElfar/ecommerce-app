const rolePermissionPath = {
    '/role_permission': {
        post: {
            tags: ['Role_Permission'],
            summary: 'Assign new permission to specific role',
            parameters: [
                {
                    name: 'Authorization',
                    in: 'header',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'Bearer token',
                    example: 'Bearer eyJhbGciOiJIUzI1NiIsIn...',
                },

            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                roleId: {
                                    type: 'integer',
                                    description: 'Role id',
                                },
                                permissionId: {
                                    type: 'integer',
                                    description: 'permission id',
                                }
                            },
                            required: ['roleId', 'permissionId'],
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                // Response body schema definition here
                                type: 'object',
                                properties: {
                                    type: { type: 'string' },
                                    rolePermission: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            roleId: { type: 'integer' },
                                            permissionId: { type: 'integer' },
                                            role: {
                                                type: 'object',
                                                properties: {
                                                    id: { type: 'integer' },
                                                    name: { type: 'string' },
                                                    createdAt: { type: 'string' },
                                                    updatedAt: { type: 'string' },
                                                },
                                            },
                                            permission: {
                                                type: 'object',
                                                properties: {
                                                    id: { type: 'integer' },
                                                    name: { type: 'string' },
                                                    createdAt: { type: 'string' },
                                                    updatedAt: { type: 'string' },
                                                },
                                            }
                                        }
                                    },
                                },
                            },
                        }
                    }
                },
                '400': {
                    description: 'Bad Request',
                },
                '403': {
                    description: 'Forbidden',
                },
                '500': {
                    description: 'Internal Server Error',
                }
            },
        },
    }
}

export default rolePermissionPath