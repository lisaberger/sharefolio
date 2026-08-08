import Account from '../models/userModel.js';
import Project from '../models/projectModel.js';

const UUID_PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const getUsers = async (req, res, next) => {
    try {
        const users = await Account.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

/* resolves a single user by id (UUID) or username */
const getUser = async (req, res, next) => {
    const { name } = req.params;

    try {
        const user = await Account.findOne({
            where: UUID_PATTERN.test(name)
                ? { id: name }
                : { username: name },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};

const getUsersProjects = async (req, res, next) => {
    const { name } = req.params;

    try {
        const user = await Account.findOne({
            where: UUID_PATTERN.test(name)
                ? { id: name }
                : { username: name },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const projects = await Project.findAll({
            where: { creator_id: user.id },
        });

        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    const userData = req.body.userData;

    try {
        await Account.create(userData);
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
};

export { getUsers, getUser, getUsersProjects, createUser };
