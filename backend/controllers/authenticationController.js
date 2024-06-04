import client from '../db/client.js';
import passport from 'passport';

const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).send([user, 'Cannot log in', info]);
        }

        req.login(user, (err) => {
            client
                .query(`SELECT * from account WHERE username = '${user}'`)
                .then((tempres) => {
                    res.send(tempres.rows[0]);
                });
        });
    })(req, res, next);
}

const logoutUser = (req, res, next) => {
    req.logout();
    console.log('logged out');
    res.send();
}

export { loginUser, logoutUser }