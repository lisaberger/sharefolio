import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Sharefolio API',
        version: '1.0.0',
        description: 'A simple Express API with Swagger documentation',
    },
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to your API routes
};

const swaggerSpec = swaggerJSDoc(options);

export {
    swaggerSpec,
    swaggerUi
};