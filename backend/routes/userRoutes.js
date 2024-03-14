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
router.route('/').get(getUsers);
router.get('/:name', getUserByName);
router.get(':name/projects', getUsersProjects)
router.get('/:id', getUserById);

/*****************/
/* POST REQUESTS */
/*****************/
router.post('/create', pfpUpload.single('profilePic'), createUser)

export default router;