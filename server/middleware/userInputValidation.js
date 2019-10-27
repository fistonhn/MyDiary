import { signupInput } from '../helper/userInput';


const validateSignup = (req, res, next) => {
  const { error } = signupInput(req);
  if (error) return res.status(400).json({ status: res.statusCode, error: error.details[0].message });

  next();
};


export { validateSignup };
