import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Authentication API',
            version: '1.0.0',
            description: 'API documentation for user authentication and password reset',
        },
        servers: [
            {
                url: 'https://backend-production-0555.up.railway.app/api',
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
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js', './controllers/*.js'],
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerDocs;