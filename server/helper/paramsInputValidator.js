import Joi from 'joi';

const validateParamsId = (req) => {
  const schema = {
    id: Joi.number().required().min(1),
  };
  return Joi.validate(req.params, schema);
};


export default validateParamsId;
