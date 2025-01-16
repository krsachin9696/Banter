import Joi from 'joi';

export const createConversationSchema = Joi.object({
  userIDs: Joi.array().items(Joi.string().uuid()).min(2).required(), // Minimum 2 userIDs
  isGroup: Joi.boolean().required(),
  name: Joi.string().when('isGroup', {
    is: true,
    then: Joi.required(), // Name is required if it's a group
    otherwise: Joi.forbidden(), // Name is forbidden for one-on-one conversations
  }),
});

export const sendMessageSchema = Joi.object({
  convoID: Joi.string().uuid().required(),
  content: Joi.string().required(),
  type: Joi.string().valid('text', 'image', 'video').default('text'),
  attachment: Joi.optional(),
});
