import express from 'express';
import * as collegeController from "../controllers/collegeController.js";
// import adminMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();
router.post('/register' , collegeController.registerCollege);

router.get("/" , collegeController.getAllCollege);

export default router;