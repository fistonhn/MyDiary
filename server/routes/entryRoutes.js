import express from 'express';
import verifyAuthToken from '../middleware/verifyAuthToken';
import validateParams from '../middleware/paramsValidation';
import { createNewEntry, getAllEntries, getOneEntry } from '../controller/diary';
import { validateEntryCreated } from '../middleware/entryInputValidation';

const router = express.Router();

router.post('/entries', [verifyAuthToken, validateEntryCreated], createNewEntry);
router.get('/entries', [verifyAuthToken], getAllEntries);
router.get('/entries/:id', [validateParams, verifyAuthToken], getOneEntry);


export default router;
