const productPath = {
    '/roles': {
        post: {
            tags: ['Role'],
            summary: 'Create New Role ',
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
                                name: {
                                    type: 'string',
                                    description: 'The name of the role have to one of(admin , vendor , customer).',
                                }
                            },
                            required: ['name', 'description'],
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
                                    product: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            name: { type: 'string' },
                                            createdAt: { type: 'string' },
                                            updatedAt: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        }
                    }
                },
                '400': {
                    description: 'Bad Request',
                },
                '500': {
                    description: 'Internal Server Error',
                }
            },
        },
    }
}

export default productPath