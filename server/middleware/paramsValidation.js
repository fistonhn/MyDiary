import validateParamsId from '../helper/paramsInputValidator';


const validateParams = (req, res, next) => {
  const { error } = validateParamsId(req);
  if (error) return res.status(400).json({ status: res.statusCode, error: error.details[0].message });

  next();
};

export default validateParams;
