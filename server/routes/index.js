import express from 'express';
import { validateSignup, validateSignin } from '../middleware/userInputValidation';
import { signup, login } from '../controller/user';

const router = express.Router();

// routes for users

router.post('/auth/signup', [validateSignup], signup);

router.post('/auth/signin', [validateSignin], login);

export default router;
