import Joi from 'joi';

const authLoginSchemaValidation = Joi.object({
  phone: Joi.string().trim().required().messages({
    'string.empty': 'Phone number is required.',
  }),

  password: Joi.string().trim().min(6).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
  }),
});

export default authLoginSchemaValidation;
