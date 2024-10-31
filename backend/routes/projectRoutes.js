import express from 'express';
import multer from 'multer';
import { getProjectByName, getProjects, createProject } from '../controllers/projectController.js';

/* Upload handlers */
const projectStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/projects');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const projectUpload = multer({ storage: projectStorage });

const router = express.Router();

/*****************/
/* GET REQUESTS  */
/*****************/

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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 101
 *                   name:
 *                     type: string
 *                     example: Project Alpha
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: 2023-01-01T00:00:00Z
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
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
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 101
 *                 name:
 *                   type: string
 *                   example: Project Alpha
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-01-01T00:00:00Z
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Project not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
router.get('/:name', getProjectByName);

/*****************/
/* POST REQUESTS */
/*****************/

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
 *               name:
 *                 type: string
 *                 description: Name of the project
 *               pics:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Project pictures
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 101
 *                 name:
 *                   type: string
 *                   example: Project Alpha
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-01-01T00:00:00Z
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Bad request
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post('/create', projectUpload.array('pics'), createProject);

export default router;
