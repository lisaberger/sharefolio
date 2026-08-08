import sequelize from '../db/db.js';
import Account from '../models/userModel.js';
import { Op } from 'sequelize';

/* stateless login: verifies credentials via the database check_password function */
const loginUser = async (req, res, next) => {
    const { username, password } = req.body ?? {};

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    try {
        const [rows] = await sequelize.query(
            'SELECT check_password(:usr, :pw) AS valid',
            {
                replacements: { usr: username, pw: password },
            }
        );

        if (!rows[0]?.valid) {
            return res
                .status(401)
                .json({ error: 'Incorrect username or password' });
        }

        const user = await Account.findOne({
            where: {
                [Op.or]: [{ username }, { email: username }],
            },
        });

        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};

const logoutUser = (req, res) => {
    res.sendStatus(200);
};

export { loginUser, logoutUser };
