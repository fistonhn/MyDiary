import Joi from 'joi';

const entryInput = (req) => {
  const schema = {
    title: Joi.string().min(3).max(150),
    description: Joi.string().min(5),
  };

  return Joi.validate(req.body, schema);
};

const entryCreated = (req) => {
  const schema = {
    title: Joi.string().required().min(3).max(150),
    description: Joi.string().required().min(5),
  };

  return Joi.validate(req.body, schema);
};

export { entryInput, entryCreated };
