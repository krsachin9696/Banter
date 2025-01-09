import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessagesState {
  currentChat: string | null;
  messages: Message[];
}

const initialState: MessagesState = {
  currentChat: null,
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    setCurrentChat(state, action: PayloadAction<string | null>) {
      state.currentChat = action.payload;
    },
  },
});

export const { setMessages, addMessage, setCurrentChat } = messagesSlice.actions;
export default messagesSlice.reducer;
