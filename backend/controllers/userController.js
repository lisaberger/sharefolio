import Account from '../models/userModel.js';
import Project from '../models/projectModel.js';

const getUsers = async (req, res, next) => {
    try {
        const users = await Account.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserByName = async (req, res, next) => {
    const { username } = req.params;
    try {
        const user = await Account.findOne({
            where: {
                username: name
            }
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await Account.findByPk(id);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUsersProjects = async (req, res, next) => {
    const { username } = req.params;
    try {
        const projects = await Project.findAll({
            include: [{
                model: Account,
                as: 'creator',
                where: { username: username },
                attributes: []
            }]
        });

        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to create a new user
const createUser = async (req, res, next) => {
    const userData = req.body.userData;
    try {
        const newUser = await Account.create(userData);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'User could not be created' });
    }
};

export { getUsers, getUserByName, getUserById, getUsersProjects, createUser };
