import { entryInput, entryCreated } from '../helper/entryInputValidator';

const validateEntryInput = (req, res, next) => {
  const { error } = entryInput(req);
  if (error) return res.status(400).json({ status: res.statusCode, error: error.details[0].message });

  next();
};

const validateEntryCreated = (req, res, next) => {
  const { error } = entryCreated(req);
  if (error) return res.status(400).json({ status: res.statusCode, error: error.details[0].message });

  next();
};


export { validateEntryInput, validateEntryCreated };
