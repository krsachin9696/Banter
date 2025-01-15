import { getConversationsWithUsers } from '../messages/messageRepository.js';
import * as userRepository from './userRepository.js';
import bcrypt from 'bcrypt';
import { userSocketMap } from '../../sockets/socketHandler.js';

// Get user by phone number (to check if the user exists)
export const getUserByPhone = async (phone) => {
  return await userRepository.getUserByPhone(phone);
};

// Create a new user
export const createUser = async (name, phone, password, avatarUrl) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password before saving

  const newUser = await userRepository.createUser({
    name,
    phone,
    password: hashedPassword,
    avatarUrl,
  });

  return newUser;
};


export const getUserProfileService = async (userID) => {
  const user = await userRepository.getUserByUserID(userID);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

export const getConversationsWithUserDetails = async (userID) => {
  const conversations = await getConversationsWithUsers(userID);

  // Format the data to include convoID, group/user name, online/offline status, and latest message
  const formattedConversations = conversations.map((conversation) => {
    // Check if the conversation is a group
    const isGroup = conversation.isGroup;
    let name;
    let onlineStatus = null;

    if (isGroup) {
      // If it's a group, use the conversation's name
      name = conversation.name;
    } else {
      // If it's not a group, get the other participant's details
      const participant = conversation.Participants.find(
        (participant) => participant.User.userID !== userID // Find the other user in the conversation
      );

      const otherUser = participant.User;
      name = otherUser.name;

      // Check online/offline status using the userSocketMap
      onlineStatus = userSocketMap[otherUser.userID] ? 'online' : 'offline';
    }

    // Get the latest message and its metadata
    const latestMessage = conversation.Messages[0];
    const latestMessageTimestamp = latestMessage ? latestMessage.createdAt : null;
    const latestMessageStatus = latestMessage ? latestMessage.status : null;

    return {
      convoID: conversation.convoID,
      name,
      isGroup,
      onlineStatus, // null if it's a group
      latestMessage: latestMessage ? latestMessage.content : null,
      latestMessageTimestamp,
      latestMessageStatus,
    };
  });

  return formattedConversations;
};


export const getAllUsersExceptCurrent = async (userID) => {
  // Get all users except the logged-in user
  const users = await userRepository.getAllUsersExceptCurrent(userID);

  // Add online status to each user
  const usersWithStatus = users.map(user => {
    const onlineStatus = userSocketMap[user.userID]?.online || false; // Check the online status
    return {
      ...user,
      online: onlineStatus,
    };
  });

  return usersWithStatus;
};