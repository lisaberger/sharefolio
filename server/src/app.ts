import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { env } from './config/env.js';
import { swaggerSpec, swaggerUi } from './swagger.js';

import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { getCategories } from './controllers/projectController.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

/* restrict CORS to the configured frontend origin(s) */
const allowedOrigins = env.CORS_ORIGIN.split(',').map((o) => o.trim());

app.use(
    cors({
        origin(origin, callback) {
            /* allow non-browser requests (curl, tests, server-to-server) */
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }
            /* no CORS headers for disallowed origins; the browser blocks it */
            callback(null, false);
        },
    })
);
/* handler for the req / res body */
app.use(bodyParser.json());

/* serve uploaded files (and, if configured, the bundled UI seed images) */
const staticDirs = env.SEED_UI_PUBLIC
    ? [express.static(env.SEED_UI_PUBLIC), express.static(env.UPLOAD_DIR)]
    : [express.static(env.UPLOAD_DIR)];

app.use('/public', ...staticDirs);

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
