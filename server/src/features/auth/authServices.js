import * as authRepository from './authRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Login user service
export const loginUser = async (phone, password) => {
  // Fetch the user from the database by phone number
  const user = await authRepository.getUserByPhone(phone);

  // If no user exists with the given phone number, return null
  if (!user) {
    return null;
  }

  // Compare the password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  // If credentials are valid, generate a JWT token
  const token = jwt.sign({ userID: user.userID }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiration time
  });

  return token;
};
