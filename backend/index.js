import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import sequelize from './db/db.js';
import EnumCategory from './models/categoryModel.js';

import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';

import { swaggerSpec, swaggerUi } from './swagger.js';

const app = express();
const port = Number(process.env.PORT ?? 4000);

/* prevent CORS errors */
app.use(cors());
/* handler for the req / res body */
app.use(bodyParser.json());

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

sequelize
    .sync({ force: false })
    .then(() => {
        console.log('Database models synchronized successfully.');
    })
    .catch((error) => {
        console.error('Error synchronizing database models:', error);
    });

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
app.get('/categories', async (req, res, next) => {
    try {
        const categories = await EnumCategory.findAll();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
});

/*****************/
/* Error Handler */
/*****************/
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
});

app.listen(port, () => {
    console.log(`Backend connection listening to http://localhost:${port}`);
});
