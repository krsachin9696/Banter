import asyncHandler from '../../utils/asyncHandler.js';
import { createConversationService } from './messageServices.js';

export const createConversation = asyncHandler(async (req, res) => {
  const { userIDs, isGroup, name } = req.body;

  // Call service function to create a conversation or group
  const { convoID } = await createConversationService(userIDs, isGroup, name);

  return res.status(200).json({ convoID });
});
