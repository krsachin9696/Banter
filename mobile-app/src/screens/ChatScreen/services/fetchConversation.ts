import axios from "axios";
import { SERVER_URL } from "../../../apis";
import { AppDispatch } from "../../../store";
import { setMessages } from "../../../store/slices/messagesSlice";

// Function to fetch the conversation
export const fetchConversation = async (
  userId: string,
  receiverId: string,
  dispatch: AppDispatch
) => {
  try {
    const response = await axios.get(`${SERVER_URL}/messages/conversation`, {
      params: {
        userId,
        otherUserId: receiverId,
      },
    });

    if (response.status === 200) {
      dispatch(setMessages(response.data.messages));
    } else {
      console.error("Failed to fetch conversation");
    }
  } catch (error) {
    console.error("Error fetching conversation:", error);
  }
};
