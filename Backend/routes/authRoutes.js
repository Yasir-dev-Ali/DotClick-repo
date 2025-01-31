import express from 'express';
import { register, login, verifyEmail, forgotPassword } from '../controller/user.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);

export default router;
