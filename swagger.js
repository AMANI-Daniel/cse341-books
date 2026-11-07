//  This file will define the OpenAPI settings, tell swagger - jsdoc where to find your route comments, and write the generated documentation to swagger.json


import { writeFileSync } from 'node:fs';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Books API',
            version: '1.0.0',
            description: 'A simple API for working with books'
        },
        servers: [
            {
                url: '/',
                description: 'Current server'
            }
        ]
    },
    apis: ['./src/router.js', './app.js']
};

const swaggerSpec = swaggerJsdoc(options);

writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('Swagger documentation generated.');