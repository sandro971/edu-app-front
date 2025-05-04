import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation de l\'API de la plateforme de formation',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Serveur de développement',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'integer' },
                        email: { type: 'string', format: 'email' },
                        firstname: { type: 'string' },
                        lastname: { type: 'string' },
                        role: { type: 'string', enum: ['admin', 'member'] },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' }
                    }
                },
                Company: {
                    type: 'object',
                    properties: {
                        _id: { type: 'integer' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        logo: { type: 'string' },
                        website: { type: 'string' },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' }
                    }
                },
                Location: {
                    type: 'object',
                    properties: {
                        _id: { type: 'integer' },
                        city: { type: 'string' },
                        country: { type: 'string' },
                        postal_code: { type: 'string' },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' }
                    }
                },
                Category: {
                    type: 'object',
                    properties: {
                        _id: { type: 'integer' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' }
                    }
                },
                Package: {
                    type: 'object',
                    properties: {
                        _id: { type: 'integer' },
                        name: { type: 'string' },
                        price: { type: 'number', format: 'float' },
                        duration: { type: 'integer' },
                        features: { type: 'object' },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' }
                    }
                },
                Offer: {
                    type: 'object',
                    properties: {
                        _id: { type: 'integer' },
                        _company: { type: 'integer' },
                        _category: { type: 'integer' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        requirements: { type: 'string' },
                        salary_min: { type: 'integer' },
                        salary_max: { type: 'integer' },
                        contract_type: { type: 'string' },
                        experience_level: { type: 'string' },
                        education_level: { type: 'string' },
                        status: { type: 'string', enum: ['active', 'inactive', 'draft'] },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' }
                    }
                },
                Candidate: {
                    type: 'object',
                    properties: {
                        _id: { type: 'integer' },
                        _user: { type: 'integer' },
                        status: { type: 'string', enum: ['pending', 'approved', 'rejected'] },
                        resume: { type: 'string' },
                        cover_letter: { type: 'string' },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' }
                    }
                },
                CandidateComment: {
                    type: 'object',
                    properties: {
                        _id: { type: 'integer' },
                        _candidate: { type: 'integer' },
                        _user: { type: 'integer' },
                        content: { type: 'string' },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' }
                    }
                },
                Attribute: {
                    type: 'object',
                    properties: {
                        _id: { type: 'integer' },
                        type: { type: 'string' },
                        title: { type: 'string' },
                        organization: { type: 'string' },
                        location: { type: 'string' },
                        start_at: { type: 'string' },
                        stop_at: { type: 'string' },
                        duration: { type: 'string' },
                        description: { type: 'string' },
                        level: { type: 'integer' },
                        created_at: { type: 'string', format: 'date-time' }
                    }
                },
                OfferQuestion: {
                    type: 'object',
                    properties: {
                        _id: { type: 'integer' },
                        _offer: { type: 'integer' },
                        title: { type: 'string' },
                        type: { type: 'string' },
                        response: { type: 'string' },
                        required: { type: 'boolean' },
                        resume: { type: 'object' },
                        active: { type: 'boolean' },
                        created_at: { type: 'string', format: 'date-time' }
                    }
                },
                OfferResponse: {
                    type: 'object',
                    properties: {
                        _id: { type: 'integer' },
                        _candidate: { type: 'integer' },
                        _offer: { type: 'integer' },
                        _question: { type: 'integer' },
                        value: { type: 'string' },
                        created_at: { type: 'string', format: 'date-time' }
                    }
                },
                Subscription: {
                    type: 'object',
                    properties: {
                        _id: { type: 'integer' },
                        _user: { type: 'integer' },
                        _package: { type: 'integer' },
                        status: { type: 'string', enum: ['active', 'inactive', 'expired'] },
                        start_at: { type: 'string', format: 'date-time' },
                        end_at: { type: 'string', format: 'date-time' },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' }
                    }
                },
                Credit: {
                    type: 'object',
                    properties: {
                        _id: { type: 'integer' },
                        _user: { type: 'integer' },
                        amount: { type: 'integer' },
                        type: { type: 'string' },
                        created_at: { type: 'string', format: 'date-time' }
                    }
                },
                Member: {
                    type: 'object',
                    properties: {
                        _id: { type: 'integer' },
                        _user: { type: 'integer' },
                        _company: { type: 'integer' },
                        role: { type: 'string' },
                        created_at: { type: 'string', format: 'date-time' }
                    }
                }
            }
        },
        security: [{
            bearerAuth: [],
        }],
    },
    apis: ['./src/routes/*.js', './src/models/*.js', './src/controllers/*.js'], // chemins vers les fichiers de routes et validateurs
};

export const specs = swaggerJsdoc(options); 