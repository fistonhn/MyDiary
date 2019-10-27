import Joi from 'joi';

const signupInput = (req) => {
  const schema = {
    firstName: Joi.string().required().min(2).max(25),
    lastName: Joi.string().required().min(2).max(25),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(15),
  };

  return Joi.validate(req.body, schema);
};

export { signupInput };
