import Joi from 'joi';

const userRegisterSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Name is required.',
    'string.min': 'Name must be at least 2 characters long.',
    'string.max': 'Name must not exceed 50 characters.',
  }),
  phone: Joi.string()
    .trim()
    .pattern(/^\+?\d{10,15}$/)
    .required()
    .messages({
      'string.empty': 'Phone number is required.',
      'string.pattern.base': 'Invalid phone number format.',
    }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 8 characters long.',
  }),
  avatarUrl: Joi.string().uri().optional().messages({
    'string.uri': 'Invalid avatar URL.',
  }),
});

export default userRegisterSchema;
