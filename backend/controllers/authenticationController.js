import Account from "../models/userModel.js";

const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).send([user, 'Cannot log in', info]);
        }

        req.login(user, async (err) => {
            if (err) {
                return next(err);
            }
            
            try {
                const loggedInUser = await Account.findOne({
                    where: { id: user.id } // Adjust this based on your user identifier (e.g., username)
                });
                
                if (!loggedInUser) {
                    throw new Error('User not found in database');
                }
                
                res.send(loggedInUser);
            } catch (error) {
                next(error);
            }
        });
    })(req, res, next);
};

const logoutUser = (req, res, next) => {
    req.logout();
    console.log('logged out');
    res.send();
};

export { loginUser, logoutUser };
