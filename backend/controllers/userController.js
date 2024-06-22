import client from '../db/client.js';

const getUsers = (req, res, next) => {
    client.query('SELECT * FROM account')
        .then((response) => {
            res.status(200).json(response.rows);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const getUserByName = (req, res, next) => {
    const { lastname } = req.params;
    client.query('SELECT * FROM account WHERE LOWER(username) = LOWER($1)', [lastname])
        .then((response) => {
            if (response.rows.length === 0) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(200).json(response.rows[0]);
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const getUserById = (req, res, next) => {
    const { id } = req.params;
    client.query('SELECT * FROM account WHERE id = $1', [id])
        .then((response) => {
            if (response.rows.length === 0) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(200).json(response.rows[0]);
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const getUsersProjects = (req, res, next) => {
    const { lastname } = req.params;
    client.query(
        `SELECT project.*, enum_category.lastname AS Kategorie, account.lastname AS Ersteller 
         FROM project
         JOIN enum_category ON project.kategorie_id = enum_category.id
         JOIN account ON project.ersteller_id = account.id
         WHERE LOWER(account.username) = LOWER($1)`, [lastname])
        .then((response) => {
            res.status(200).json(response.rows);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const createUser = (req, res, next) => {
    const userData = JSON.parse(req.body.userData);
    const query = `INSERT INTO account 
                   (firstname, lastname, email, password, username, job, location, description, image) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const values = [
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password,
        userData.userName,
        userData.job,
        userData.location,
        userData.descr,
        userData.profilePic,
    ];

    client.query(query, values)
        .then((response) => {
            res.sendStatus(201); // 201 Created
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

export { getUsers, getUserByName, getUserById, getUsersProjects, createUser };
