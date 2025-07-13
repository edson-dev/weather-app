const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Weather Forecast API',
            version: '0.0.0',
            description: 'API for retrieving weather forecast information with protected routes and caching.',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/**/*.ts'], // Path to the API routes,
};

const specs = swaggerJsdoc(options);

export {
    swaggerUi,
    specs,
};