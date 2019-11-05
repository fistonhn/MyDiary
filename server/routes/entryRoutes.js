import express from 'express';
import verifyAuthToken from '../middleware/verifyAuthToken';
import { createNewEntry } from '../controller/diary';
import { validateEntryCreated } from '../middleware/entryInputValidation';

const router = express.Router();

router.post('/entries', [verifyAuthToken, validateEntryCreated], createNewEntry);


export default router;
