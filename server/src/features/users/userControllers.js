import asyncHandler from '../../utils/asyncHandler.js';
import * as userServices from './userServices.js';

// User registration controller
export const userRegister = asyncHandler(async (req, res) => {
  const { name, phone, password, avatarUrl } = req.body;

  // Check if the user already exists by phone number
  const existingUser = await userServices.getUserByPhone(phone);
  if (existingUser) {
    return res.status(400).json({ message: 'Phone number already exists.' });
  }

  // Create the user
  const newUser = await userServices.createUser(
    name,
    phone,
    password,
    avatarUrl,
  );

  res.status(201).json({
    message: 'User registered successfully',
    user: newUser,
  });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const { userID } = req.user;

  // Call the service to get the user profile
  const user = await userServices.getUserProfileService(userID);

  // Return the user data as response
  res.status(200).json({ user });
});


export const getConversationsWithUserDetails = asyncHandler(async (req, res) => {
  const { userID } = req.user;

  // Call the service to get the conversations and user details
  const conversations = await userServices.getConversationsWithUserDetails(userID);

  // Return the formatted response
  res.status(200).json({ conversations });
});

export const getAllUsersExceptCurrent = asyncHandler(async (req, res) => {
  const { userID } = req.user; // Get the logged-in user's ID from the JWT or session

  const users = await userServices.getAllUsersExceptCurrent(userID);

  res.status(200).json({ users });
});