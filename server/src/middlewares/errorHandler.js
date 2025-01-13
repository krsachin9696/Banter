import { ApiError } from '../utils/apiError.js';
import logger from '../utils/logger.js';

const errorHandler = (err, req, res, _next) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  logger.error({
    message: err.message,
    stack: isDevelopment ? err.stack : null,
    statusCode: err.statusCode || 500,
    errors: err.errors || [],
    path: req.originalUrl,
    method: req.method,
    user: req.user ? req.user.userID : null,
  });

  if (err instanceof ApiError) {
    return res.status(err.statusCode || 500).json({
      success: err.success || false,
      message: err.message || 'Something went wrong',
      errors: err.errors || [],
      stack: isDevelopment ? err.stack : null,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    errors: [err.message],
    stack: isDevelopment ? err.stack : null,
  });
};

export { errorHandler };
