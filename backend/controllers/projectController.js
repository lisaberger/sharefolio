import Account from '../models/userModel.js';
import EnumCategory from '../models/categoryModel.js';
import Project from '../models/projectModel.js';
import { Op, Sequelize } from 'sequelize';

const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
};


const getProjectByName = async (req, res, next) => {
    const projectName = req.params.name;
    const requestName = projectName.toLowerCase().replace('-', ' ');

    try {
        const project = await Project.findOne({
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('lower', Sequelize.col('Project.name')), requestName)
                ]
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
        next(error);
    }
};

const createProject = async (req, res, next) => {
    let projectData;
    try {
        projectData =
            typeof req.body.projectData === 'string'
                ? JSON.parse(req.body.projectData)
                : req.body.projectData ?? {};
    } catch (error) {
        return res.status(400).json({ error: 'Invalid project data' });
    }

    try {
        const newProject = await Project.create({
            creator_id: projectData.creatorId ?? null,
            teaserImage: projectData.headerPath,
            name: projectData.title,
            description: projectData.descr,
            kind: projectData.art,
            tools: projectData.tools,
            category_id: projectData.category || null,
            demo: projectData.link,
            image1: projectData.pic1Path,
            image2: projectData.pic2Path,
            contributors: projectData.collabs,
        });

        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
};

export { getProjects, getProjectByName, createProject };
