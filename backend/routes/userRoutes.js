import express from 'express';
import multer from 'multer';
import { createUser, getUserById, getUserByName, getUsers, getUsersProjects } from '../controllers/userController.js';

/* Upload handlers */
const pfpStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/profile');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const pfpUpload = multer({ storage: pfpStorage });

const router = express.Router();

/*****************/
/* GET REQUESTS  */
/*****************/

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve a list of all users
 *     description: Fetches a list of all users in the system.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A JSON array of user objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route('/').get(getUsers);

/**
 * @openapi
 * /users/{name}:
 *   get:
 *     summary: Get user by name
 *     description: Fetches a user by their name.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Name of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
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
router.get('/:name', getUserByName);

/**
 * @openapi
 * /users/{name}/projects:
 *   get:
 *     summary: Get projects of a user by name
 *     description: Fetches projects associated with a user by their name.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Name of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A JSON array of project objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       404:
 *         description: User or projects not found
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
router.get('/:name/projects', getUsersProjects);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Fetches a user by their ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
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
router.get('/:id', getUserById);

/*****************/
/* POST REQUESTS */
/*****************/

/**
 * @openapi
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with an optional profile picture.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 format: binary
 *                 description: Profile picture of the user
 *               otherField:
 *                 type: string
 *                 description: Other field related to user creation
 *     responses:
 *       201:
 *         description: User created successfully
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
router.post('/create', pfpUpload.single('profilePic'), createUser);

export default router;
