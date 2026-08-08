import type { NextFunction, Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import sequelize from '../db/db.js';
import Account from '../models/userModel.js';
import { Op } from 'sequelize';
import { loginSchema } from '../schemas/authSchema.js';

/* stateless login: verifies credentials via the database check_password function */
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    const { username, password } = parsed.data;

    try {
        const rows = await sequelize.query<{ valid: boolean }>(
            'SELECT check_password(:usr, :pw) AS valid',
            {
                replacements: { usr: username, pw: password },
                type: QueryTypes.SELECT,
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

const logoutUser = (req: Request, res: Response) => {
    res.sendStatus(200);
};

export { loginUser, logoutUser };
