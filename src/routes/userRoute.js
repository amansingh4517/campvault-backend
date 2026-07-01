import express from 'express';
import * as userController from '../controllers/userController.js'

const router = express.Router();

// Route: POST /api/users/register
router.post('/register' , userController.register);

router.post('/login' , userController.login);

export default router;