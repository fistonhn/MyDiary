import express from 'express';
import { validateSignup } from '../middleware/userInputValidation';
import { signup } from '../controller/user';

const router = express.Router();

// routes for users

router.post('/auth/signup', [validateSignup], signup);

export default router;
