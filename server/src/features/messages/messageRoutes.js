import express from 'express';
import { createConversationSchema, sendMessageSchema } from './messageSchema.js';
import { createConversation, sendMessage } from './messageControllers.js';
import validate from '../../middlewares/validationMiddleware.js';

const messageRoute = express.Router();

// Route for creating a conversation
messageRoute.post('/createConversation', validate(createConversationSchema), createConversation);
messageRoute.post('/sendMessage', validate(sendMessageSchema), sendMessage);

export default messageRoute;
