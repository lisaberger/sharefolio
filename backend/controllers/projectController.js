import client from '../db/client.js'

const getProjects = (req, res, next) => {
    client.query(`SELECT * from project`).then((response) => {
        res.send(JSON.stringify(response.rows));
    });
}

const getProjectByName = (req, res, next) => {
    client
        .query(
            `SELECT project.*, enum_category.name AS Kategorie, account.name AS Ersteller, account.username AS Author FROM project, enum_category, account WHERE LOWER(TRIM(REPLACE(project.name, ' ', '-'))) = LOWER(TRIM(REPLACE('${req.params.name}', ' ', '-'))) AND project.kategorie_id = enum_category.id AND project.ersteller_id = account.id; `
        )
        .then((response) => {
            console.log(response.rows);
            res.send(JSON.stringify(response.rows));
        });
}

const createProject = (req, res, next) => {
    const projectData = JSON.parse(req.body.projectData);
    client
        .query(
            `INSERT INTO project (ersteller_id, titelbild, name, beschreibung, art, tools, kategorie_id, demolink, bild1, bild2) VALUES ('${projectData.creatorId}', '${projectData.headerPath}', '${projectData.title}', '${projectData.descr}', '${projectData.art}', '${projectData.tools}', '${projectData.category}', '${projectData.link}', '${projectData.pic1Path}', '${projectData.pic2Path}')`
        )
        .then((response) => {
            res.sendStatus(200);
        });
}

export { getProjects, getProjectByName, createProject }