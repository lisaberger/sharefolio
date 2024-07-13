import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret"; // Same secret as in loginUser function

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
            
        });
    } else {
        res.sendStatus(401);
    }
};

export { authenticateJWT };
