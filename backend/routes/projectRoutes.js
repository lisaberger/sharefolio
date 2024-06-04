import express from 'express';
import multer from 'multer';
import { getProjectByName, getProjects, createProject } from '../controllers/projectController.js';

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
router.route('/').get(getProjects);
router.get('/:name', getProjectByName);

/*****************/
/* POST REQUESTS */
/*****************/
router.post('/create', projectUpload.array('pics'), createProject);

export default router;