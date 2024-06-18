import Account from '../models/userModel.js';
import EnumCategory from '../models/categoryModel.js';
import Project from '../models/projectModel.js';

const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getProjectByName = async (req, res, next) => {
    const projectName = req.params.name.replace(/\s+/g, '-').toLowerCase();
    try {
        const project = await Project.findOne({
            where: {
                name: projectName
            },
            include: [
                { model: EnumCategory, as: 'category', attributes: ['name'] },
                { model: Account, as: 'creator', attributes: ['name', 'username'] }
            ]
        });

        if (!project) {
            res.status(404).json({ error: 'Project not found' });
        } else {
            res.status(200).json(project);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createProject = async (req, res, next) => {
    const projectData = req.body.projectData;

    try {
        const newProject = await Project.create({
            ersteller_id: projectData.creatorId,
            titelbild: projectData.headerPath,
            name: projectData.title,
            beschreibung: projectData.descr,
            art: projectData.art,
            tools: projectData.tools,
            kategorie_id: projectData.category,
            demolink: projectData.link,
            bild1: projectData.pic1Path,
            bild2: projectData.pic2Path
        });

        res.sendStatus(201); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { getProjects, getProjectByName, createProject };
