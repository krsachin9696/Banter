import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError.js';

const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1]; // Assumes 'Bearer token' format

  if (!token) {
    return next(new ApiError(401, 'Authorization token is missing'));
  }

  // Verify the token using JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ApiError(401, 'Invalid or expired token'));
    }

    // Attach user information from the token to the request object
    req.user = decoded; // The decoded token contains the user info (e.g., userID)
    next(); // Call the next middleware or route handler
  });
};

export default authMiddleware;
