import { Router } from 'express';
import { createUser, getUser, getUsers, getUsersProjects, } from '../controllers/userController.js';
const router = Router();
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
 *     summary: Get a user by name or id
 *     description: Fetches a user by their username or UUID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Username or UUID of the user.
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
router.get('/:name', getUser);
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
 *         description: Username or UUID of the user.
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
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userData:
 *                 $ref: '#/components/schemas/UserCreate'
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
router.post('/create', createUser);
export default router;
//# sourceMappingURL=userRoutes.js.map