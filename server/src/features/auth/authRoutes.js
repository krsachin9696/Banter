import { Router } from 'express';
import * as authControllers from './authControllers.js';
import validate from '../../middlewares/validationMiddleware.js';
import authLoginSchemaValidation from './authSchema.js';

const authRoute = Router();

// Login route
authRoute.post(
  '/login',
  validate(authLoginSchemaValidation),
  authControllers.loginUser,
);

export default authRoute;
