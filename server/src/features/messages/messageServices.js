import { createConversation } from './messageRepository.js';

export const createConversationService = async (userIDs, isGroup, name) => {
  // Sort userIDs to maintain consistent ordering
  const sortedUserIDs = userIDs.sort();

  // Call repository function to create a conversation or group
  const { convoID } = await createConversation(sortedUserIDs, isGroup, name);

  return { convoID };
};
