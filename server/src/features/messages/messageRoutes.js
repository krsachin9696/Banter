import express from 'express';
import { createConversationSchema, sendMessageSchema } from './messageSchema.js';
import { createConversation, getMessages, sendMessage } from './messageControllers.js';
import validate from '../../middlewares/validationMiddleware.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const messageRoute = express.Router();

// Route for creating a conversation
messageRoute.post('/createConversation', validate(createConversationSchema), createConversation);
messageRoute.post('/sendMessage', authMiddleware, validate(sendMessageSchema), sendMessage);
messageRoute.get('/getMessages', getMessages);

export default messageRoute;
