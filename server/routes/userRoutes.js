import express from 'express';
import { signup, login } from '../controller/user';
import { validateSignup, validateSignin } from '../middleware/userInputValidation';


const router = express.Router();

router.post('/auth/signup', [validateSignup], signup);

router.post('/auth/signin', [validateSignin], login);


export default router;
