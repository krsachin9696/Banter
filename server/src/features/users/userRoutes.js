import { Router } from 'express';
import * as userControllers from './userControllers.js';
import validate from '../../middlewares/validationMiddleware.js';
import userRegisterSchema from './userSchema.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const userRoute = Router();

// User registration route
userRoute.post('/register', validate(userRegisterSchema), userControllers.userRegister);
userRoute.get('/profile', authMiddleware, userControllers.getUserProfile);
userRoute.get('/chat', authMiddleware, userControllers.getConversationsWithUserDetails);
userRoute.get('/all', authMiddleware, userControllers.getAllUsersExceptCurrent);

export default userRoute;
