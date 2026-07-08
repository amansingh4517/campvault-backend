import express from 'express';
import * as userController from '../controllers/userController.js'
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route: POST /api/users/register
router.post('/register' , userController.register);

router.post('/login' , userController.login);

router.get('/profile' , authenticate , userController.getProfile);

export default router;