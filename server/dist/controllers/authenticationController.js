import { QueryTypes } from 'sequelize';
import sequelize from '../db/db.js';
import Account from '../models/userModel.js';
import { Op } from 'sequelize';
import { loginSchema } from '../schemas/authSchema.js';
import { issueToken } from '../utils/token.js';
/* stateless login: verifies credentials via the database check_password function */
const loginUser = async (req, res, next) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    const { username, password } = parsed.data;
    try {
        const rows = await sequelize.query('SELECT check_password(:usr, :pw) AS valid', {
            replacements: { usr: username, pw: password },
            type: QueryTypes.SELECT,
        });
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
        if (!user) {
            return res
                .status(401)
                .json({ error: 'Incorrect username or password' });
        }
        const token = issueToken(user.id);
        const { password: _password, ...safeUser } = user.toJSON();
        return res.status(200).json({ ...safeUser, token });
    }
    catch (error) {
        return next(error);
    }
};
const logoutUser = (req, res) => {
    res.sendStatus(200);
};
export { loginUser, logoutUser };
//# sourceMappingURL=authenticationController.js.map