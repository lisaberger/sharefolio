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
    const projectName = req.params.name;
    try {
        const project = await Project.findOne({
            where: {
                name: projectName
            },
            include: [
                { model: EnumCategory, as: 'category', attributes: ['name'] },
                { model: Account, as: 'creator', attributes: ['lastname', 'username'] }
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
            creator_id: projectData.creatorId,
            teaserImage: projectData.headerPath,
            name: projectData.title,
            desciption: projectData.descr,
            kind: projectData.art,
            tools: projectData.tools,
            category_id: projectData.category,
            demo: projectData.link,
            image1: projectData.pic1Path,
            image2: projectData.pic2Path
        });

        res.sendStatus(201); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { getProjects, getProjectByName, createProject };
