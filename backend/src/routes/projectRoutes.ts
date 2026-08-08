import { Router } from 'express';
import type { RequestHandler } from 'express';
import {
    createProject,
    getProjectByName,
    getProjects,
} from '../controllers/projectController.js';
import { projectUpload } from '../utils/upload.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

/**
 * @openapi
 * /projects:
 *   get:
 *     summary: Retrieve a list of all projects
 *     description: Fetches a list of all projects in the system.
 *     tags:
 *       - Projects
 *     responses:
 *       200:
 *         description: A JSON array of project objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route('/').get(getProjects);

/**
 * @openapi
 * /projects/{name}:
 *   get:
 *     summary: Get project by name
 *     description: Fetches a project by its name.
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Name of the project.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A project object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:name', getProjectByName);

/**
 * @openapi
 * /projects/create:
 *   post:
 *     summary: Create a new project
 *     description: Creates a new project with optional pictures.
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               projectData:
 *                 type: string
 *                 description: JSON string with the project fields
 *               pics:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Project pictures
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/create', requireAuth, projectUpload.array('pics'), createProject as RequestHandler);

export default router;
