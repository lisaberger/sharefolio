// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import Account from "../models/userModel.js";

const JWT_SECRET = "your_jwt_secret";

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await Account.findOne({ where: { username } });

        if (!user) {
            return res.status(400).send(['Cannot log in', 'User not found']);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send(['Cannot log in', 'Invalid password']);
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.send({ token, user });
    } catch (error) {
        next(error);
    }
};

const logoutUser = (req, res, next) => {
    res.send({ message: 'Logged out' });
};

export { loginUser, logoutUser };