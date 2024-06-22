import client from '../db/client.js';

const getProjects = (req, res, next) => {
    client.query('SELECT * FROM project')
        .then((response) => {
            res.status(200).json(response.rows);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const getProjectByName = (req, res, next) => {
    const projectName = req.params.name.replace(/\s+/g, '-').toLowerCase();
    client.query(`
        SELECT 
            project.*, 
            enum_category.name AS Kategorie, 
            account.name AS Ersteller, 
            account.username AS Author 
        FROM 
            project 
        JOIN 
            enum_category ON project.category_id = enum_category.id 
        JOIN 
            account ON project.creator_id = account.id 
        WHERE 
            LOWER(REPLACE(project.name, ' ', '-')) = $1`, [projectName])
        .then((response) => {
            if (response.rows.length === 0) {
                res.status(404).json({ error: 'Project not found' });
            } else {
                res.status(200).json(response.rows);
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const createProject = (req, res, next) => {
    const projectData = req.body.projectData;
    const query = `
        INSERT INTO project 
            (ersteller_id, titelbild, name, description, art, tools, kategorie_id, demolink, bild1, bild2) 
        VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    const values = [
        projectData.creatorId,
        projectData.headerPath,
        projectData.title,
        projectData.descr,
        projectData.art,
        projectData.tools,
        projectData.category,
        projectData.link,
        projectData.pic1Path,
        projectData.pic2Path
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

export { getProjects, getProjectByName, createProject };
