import express from 'express';
import { createConversationSchema } from './messageSchema.js';
import { createConversation } from './messageControllers.js';
import validate from '../../middlewares/validationMiddleware.js';

const messageRoute = express.Router();

// Route for creating a conversation
messageRoute.post('/createConversation', validate(createConversationSchema), createConversation);

export default messageRoute;
