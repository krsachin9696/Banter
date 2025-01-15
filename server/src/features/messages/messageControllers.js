import asyncHandler from '../../utils/asyncHandler.js';
import { createConversationService, sendMessageService } from './messageServices.js';

export const createConversation = asyncHandler(async (req, res) => {
  const { userIDs, isGroup, name } = req.body;

  // Call service function to create a conversation or group
  const { convoID } = await createConversationService(userIDs, isGroup, name);

  return res.status(200).json({ convoID });
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { convoID, userID, content, type, attachment } = req.body;

  // Call the service function to process the message
  const message = await sendMessageService({
    convoID,
    userID,
    content,
    type,
    attachment,
  });

  res.status(200).json({ message });
});