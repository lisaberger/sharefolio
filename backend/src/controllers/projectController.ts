import type { NextFunction, Request, Response } from 'express';
import { Op, Sequelize } from 'sequelize';
import Account from '../models/userModel.js';
import EnumCategory from '../models/categoryModel.js';
import Project from '../models/projectModel.js';
import { projectDataSchema } from '../schemas/projectSchema.js';
import { toPublicPath } from '../utils/upload.js';

const UUID_PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const getProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
};

const getProjectByName = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const projectName = req.params.name;
    const requestName = projectName.toLowerCase().replace('-', ' ');

    try {
        const project = await Project.findOne({
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn(
                            'lower',
                            Sequelize.col('Project.name')
                        ),
                        requestName
                    ),
                ],
            },
            include: [
                {
                    model: EnumCategory,
                    as: 'category',
                    attributes: ['name'],
                },
                {
                    model: Account,
                    as: 'creator',
                    attributes: ['lastname', 'username'],
                },
            ],
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

interface ProjectUploadRequest extends Request {
    files?: Express.Multer.File[] | Record<string, Express.Multer.File[]>;
}

const asFileArray = (
    files: Express.Multer.File[] | Record<string, Express.Multer.File[]> | undefined
): Express.Multer.File[] => {
    if (!files) return [];
    return Array.isArray(files) ? files : Object.values(files).flat();
};

const createProject = async (
    req: ProjectUploadRequest,
    res: Response,
    next: NextFunction
) => {
    let projectData;
    try {
        projectData =
            typeof req.body.projectData === 'string'
                ? JSON.parse(req.body.projectData)
                : req.body.projectData ?? {};
    } catch {
        return res.status(400).json({ error: 'Invalid project data' });
    }

    const parsed = projectDataSchema.safeParse(projectData);

    if (!parsed.success) {
        return res.status(400).json({
            error: parsed.error.issues
                .map((issue) => issue.message)
                .join(', '),
        });
    }

    const data = parsed.data;

    /* server-generated paths from the actual uploaded files */
    const files = asFileArray(req.files);
    const [teaser, image1, image2] = files.map((file) =>
        toPublicPath(file.filename)
    );

    try {
        const newProject = await Project.create({
            creator_id: data.creatorId ?? null,
            teaserImage: teaser,
            name: data.title,
            description: data.descr,
            kind: data.art,
            tools: data.tools,
            category_id: data.category ?? null,
            demo: data.link,
            image1,
            image2,
            contributors: data.collabs,
        });

        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
};

const getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categories = await EnumCategory.findAll();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

const resolveUser = async (name: string) => {
    return Account.findOne({
        where: UUID_PATTERN.test(name) ? { id: name } : { username: name },
    });
};

export {
    getProjects,
    getProjectByName,
    createProject,
    getCategories,
    resolveUser,
};
