import express from 'express';
import { loginUser, logoutUser } from '../controllers/authenticationController.js';

const router = express.Router();

router.get('logout', logoutUser);
router.post('login', loginUser);

export default router;