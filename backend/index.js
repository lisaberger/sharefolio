import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import sequelize from './db/db.js'; // adjust path as per your project structure

import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';

import { swaggerSpec, swaggerUi } from './swagger.js';

const app = express();
const port = 4000;

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

    
    /*************/
    /* REST API  */
    /*************/
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
    /* Users */
    app.use('/users', userRoutes)
    /* Auths */
    app.use('/auth', authRoutes);
    /* Projects */
    app.use('/projects', projectRoutes);
    
    /* Categories */
    // app.get('/categories', (req, res) => {
    //     client.query(`SELECT * from enum_category`).then((response) => {
    //         res.send(JSON.stringify(response.rows));
    //     });
    // });
    
/*****************/
/*    Console    */
/*****************/
app.listen(port, () => {
    console.log(`Backend connection listening to http://localhost: ${port}`);
});
