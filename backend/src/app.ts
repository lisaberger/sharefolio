import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'node:path';

import { env } from './config/env.js';
import { swaggerSpec, swaggerUi } from './swagger.js';

import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { getCategories } from './controllers/projectController.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

/* prevent CORS errors */
app.use(cors());
/* handler for the req / res body */
app.use(bodyParser.json());

/* serve uploaded files */
app.use('/public', express.static(path.join(env.UPLOAD_DIR, '..')));

/* swagger */
app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customSiteTitle: 'Sharefolio API Docs',
    })
);

app.get('/docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

/*************/
/* REST API  */
/*************/

/* User */
app.use('/users', userRoutes);
/* Auth */
app.use('/auth', authRoutes);
/* Projects */
app.use('/projects', projectRoutes);

/* Categories */
app.get('/categories', getCategories);

/*****************/
/* Error Handler */
/*****************/
app.use(errorHandler);

export default app;
