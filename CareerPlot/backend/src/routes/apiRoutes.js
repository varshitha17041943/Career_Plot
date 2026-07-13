import express from 'express';
import multer from 'multer';
import { registerUser, loginUser } from '../controllers/authController.js';
import { uploadAndAnalyze } from '../controllers/resumeController.js';
import { startInterview, answerQuestion } from '../controllers/interviewController.js';
import { getDashboardData } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Setup Multer for PDF upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage: storage });

// Auth Routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// Resume & Agent Workflow Routes
router.post('/uploadResume', protect, upload.single('resume'), uploadAndAnalyze);

// Interview Routes
router.post('/interview/start', protect, startInterview);
router.post('/interview/answer', protect, answerQuestion);

// Dashboard Route
router.get('/dashboard', protect, getDashboardData);

export default router;
