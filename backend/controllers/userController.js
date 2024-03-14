import client from '../db/client.js';

const getUsers = (req, res, next) => {
    client.query('SELECT * FROM account').then((response) => {
        res.send(JSON.stringify(response.rows));
    });
}

const getUserByName = (req, res, next) => {
    client
        .query(
            `SELECT * FROM account WHERE LOWER(account.username) = LOWER('${req.params.user}')`
        )
        .then((response) => {
            console.log(response.rows);
            res.send(JSON.stringify(response.rows));
        });
}

const getUserById = (req, res, next) => {
    client
        .query(`SELECT * FROM account WHERE id = '${req.params.id}'`)
        .then((response) => {
            console.log(response.rows);
            res.send(JSON.stringify(response.rows));
        });
}

const getUsersProjects = (req, res, next) => {
    client
    .query(
        `SELECT project.*, enum_category.name AS Kategorie, account.name AS Ersteller FROM project, enum_category, account WHERE LOWER(account.username) = LOWER('${req.params.name}') AND project.kategorie_id = enum_category.id AND project.ersteller_id = account.id;`
    )
    .then((response) => {
        console.log(response.rows);
        res.send(JSON.stringify(response.rows));
    });
}

const createUser = (req, res, next) => {
    //console.log(JSON.parse(req.body.userData).userName);
    const userData = JSON.parse(req.body.userData);
    client
        .query(
            `INSERT INTO account (vorname, name, email, password, username, jobtitel, ort, beschreibung, profilbild) VALUES ('${userData.firstName}','${userData.lastName}', '${userData.email}', '${userData.password}', '${userData.userName}', '${userData.job}', '${userData.location}', '${userData.descr}', '${userData.profilePic}')`
        )
        .then((response) => {
            res.sendStatus(200);
        });
}

export { getUsers, getUserByName, getUserById, getUsersProjects, createUser }