import path from 'node:path';
import { fileURLToPath } from 'node:url';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Sharefolio API',
        version: '1.0.0',
        description:
            'REST API for the Sharefolio portfolio sharing platform.',
        contact: {
            name: 'Sharefolio',
        },
        license: {
            name: 'MIT',
        },
    },
    servers: [
        {
            url: process.env.SWAGGER_SERVER_URL ?? 'http://api.sharefolio.local',
            description: process.env.SWAGGER_SERVER_DESCRIPTION ?? 'Sharefolio API',
        },
        {
            url: 'http://localhost:4000',
            description: 'Local development',
        },
    ],
    tags: [
        { name: 'Auth', description: 'Authentication and sessions' },
        { name: 'Users', description: 'User management' },
        { name: 'Projects', description: 'Project management' },
        { name: 'Categories', description: 'Project categories' },
    ],
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                        description: 'Unique user identifier',
                        example: '3f2504e0-4f89-41d3-9a0c-0305e82c3301',
                    },
                    lastname: {
                        type: 'string',
                        example: 'Doe',
                    },
                    username: {
                        type: 'string',
                        example: 'john.doe',
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'john.doe@example.com',
                    },
                    isAdmin: {
                        type: 'boolean',
                        default: false,
                    },
                    firstname: {
                        type: 'string',
                        example: 'John',
                        nullable: true,
                    },
                    job: {
                        type: 'string',
                        example: '3D Artist',
                        nullable: true,
                    },
                    location: {
                        type: 'string',
                        example: 'Augsburg',
                        nullable: true,
                    },
                    description: {
                        type: 'string',
                        nullable: true,
                    },
                    image: {
                        type: 'string',
                        example: '/public/profile/avatar_placeholder.png',
                    },
                },
            },
            UserCreate: {
                type: 'object',
                required: ['lastname', 'username', 'email', 'password'],
                properties: {
                    lastname: {
                        type: 'string',
                        example: 'Doe',
                    },
                    username: {
                        type: 'string',
                        example: 'john.doe',
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'john.doe@example.com',
                    },
                    password: {
                        type: 'string',
                        format: 'password',
                        example: 'secret123',
                    },
                    firstname: {
                        type: 'string',
                        example: 'John',
                    },
                    job: {
                        type: 'string',
                        example: '3D Artist',
                    },
                    location: {
                        type: 'string',
                        example: 'Augsburg',
                    },
                    description: {
                        type: 'string',
                    },
                    profilePic: {
                        type: 'string',
                        format: 'binary',
                        description: 'Profile picture upload',
                    },
                },
            },
            LoginCredentials: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'john.doe@example.com',
                    },
                    password: {
                        type: 'string',
                        format: 'password',
                        example: 'secret123',
                    },
                },
            },
            Project: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                        example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                    },
                    creator_id: {
                        type: 'string',
                        format: 'uuid',
                        nullable: true,
                    },
                    teaserImage: {
                        type: 'string',
                        example: '/public/projects/images_placeholder.jpg',
                    },
                    name: {
                        type: 'string',
                        example: 'Project Alpha',
                    },
                    description: {
                        type: 'string',
                        nullable: true,
                    },
                    kind: {
                        type: 'string',
                        example: 'Animation',
                    },
                    tools: {
                        type: 'string',
                        nullable: true,
                    },
                    category_id: {
                        type: 'integer',
                        nullable: true,
                    },
                    demo: {
                        type: 'string',
                        nullable: true,
                    },
                    image1: {
                        type: 'string',
                    },
                    image2: {
                        type: 'string',
                    },
                    contributors: {
                        type: 'string',
                        nullable: true,
                    },
                },
            },
            ProjectCreate: {
                type: 'object',
                required: ['name', 'kind'],
                properties: {
                    name: {
                        type: 'string',
                        example: 'Project Alpha',
                    },
                    kind: {
                        type: 'string',
                        example: 'Animation',
                    },
                    description: {
                        type: 'string',
                    },
                    tools: {
                        type: 'string',
                    },
                    category_id: {
                        type: 'integer',
                    },
                    demo: {
                        type: 'string',
                    },
                    contributors: {
                        type: 'string',
                    },
                    pics: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                        description: 'Project pictures',
                    },
                },
            },
            Category: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        example: 1,
                    },
                    name: {
                        type: 'string',
                        example: 'Animation',
                    },
                },
            },
            Error: {
                type: 'object',
                properties: {
                    error: {
                        type: 'string',
                        example: 'Internal Server Error',
                    },
                },
            },
        },
    },
};

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, 'routes', '*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
