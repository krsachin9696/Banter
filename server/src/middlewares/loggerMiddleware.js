import morgan from 'morgan';
import logger from '../utils/logger.js';

// Define a custom token to log request body
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

const isDevelopment = process.env.NODE_ENV === 'development';
const morganFormat = isDevelopment
  ? ':method :url :status :response-time ms - :body'
  : ':method :url :status :response-time ms';

export const loggerMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => {
      logger.info(message.trim()); // Log morgan output to Winston logger
    },
  },
});
