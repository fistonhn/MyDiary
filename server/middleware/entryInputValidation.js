import entryInput from '../helper/entryInput';

const validateEntryInput = (req, res, next) => {
  const { error } = entryInput(req);
  if (error) return res.status(400).json({ status: res.statusCode, error: error.details[0].message });

  next();
};

export default validateEntryInput;
