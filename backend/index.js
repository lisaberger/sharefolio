import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import client from './db/client.js';

import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import authenticationRoutes from './routes/authenticationRoutes.js';

const app = express();
const port = 4000;

/* Start cookie session and append passport */
app.use(
    cookieSession({
        name: 'mysession',
        keys: ['randomkey'],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
);

app.use(passport.initialize());
app.use(passport.session());

/* prevent CORS errors */
app.use(cors());
/* handler for the req / res body */
app.use(bodyParser.json());
/* connect to db */
client.connect();


/*************/
/* REST API  */
/*************/

/* User */
app.use('/users', userRoutes)
/* Auth */
app.use('/auth', authenticationRoutes);
/* Projects */
app.use('/projects', projectRoutes);

/* Categories */
app.get('/categories', (req, res) => {
    client.query(`SELECT * from enum_category`).then((response) => {
        res.send(JSON.stringify(response.rows));
    });
});

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        (username, password, done) => {
            client
                .query(`SELECT check_password('${username}', '${password}')`)
                .then((res) => {
                    console.log(res.rows);
                    if (res.rows[0].check_password) {
                        done(null, username);
                    } else {
                        done(null, false, {
                            message: 'Incorrect username or password',
                        });
                    }
                });
        }
    )
);

/*****************/
/*    Console    */
/*****************/
app.listen(port, () => {
    console.log(`Backend connection listening to http://localhost: ${port}`);
});
