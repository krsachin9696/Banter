import asyncHandler from '../../utils/asyncHandler.js';
import * as authServices from './authServices.js';

// Login controller
export const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  // Check if the user exists and if the password is correct
  const token = await authServices.loginUser(phone, password);
  
  // If login is successful, send the token
  if (token) {
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } else {
    // If authentication fails, send an error message
    res.status(401).json({ message: 'Invalid phone number or password' });
  }
});
