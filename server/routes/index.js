import express from 'express';
import verifyAuthToken from '../middleware/verifyAuthToken';
import validateParams from '../middleware/paramsValidation';
import validateEntryInput from '../middleware/entryInputValidation';
import { validateSignup, validateSignin } from '../middleware/userInputValidation';
import { signup, login } from '../controller/user';
import { createNewEntry, getAllEntries, getOneEntry } from '../controller/diary';

const router = express.Router();

// routes for users

router.post('/auth/signup', [validateSignup], signup);

router.post('/auth/signin', [validateSignin], login);

// routes for entries

router.get('/entries/', [verifyAuthToken], getAllEntries);

router.post('/entries', [verifyAuthToken, validateEntryInput], createNewEntry);

router.get('/entries/:id', [validateParams, verifyAuthToken], getOneEntry);


export default router;
