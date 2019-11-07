import express from 'express';
import verifyAuthToken from '../middleware/verifyAuthToken';
import validateParams from '../middleware/paramsValidation';
import { createNewEntry, getAllEntries, getOneEntry, updateEntry, deleteEntry } from '../controller/diary';
import { validateEntryCreated, validateEntryInput } from '../middleware/entryInputValidation';

const router = express.Router();

router.post('/entries', [verifyAuthToken, validateEntryCreated], createNewEntry);
router.get('/entries', [verifyAuthToken], getAllEntries);
router.get('/entries/:id', [validateParams, verifyAuthToken], getOneEntry);
router.patch('/entries/:id', [validateParams, verifyAuthToken, validateEntryInput], updateEntry);
router.delete('/entries/:id', [validateParams, verifyAuthToken], deleteEntry);


export default router;
