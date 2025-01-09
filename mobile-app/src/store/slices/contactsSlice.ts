import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../apis";
import axios from "axios";

// Initial state
interface ContactsState {
  contacts: ContactInfoProps[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
};

// Create an async thunk for loading contacts
export const loadContacts = createAsyncThunk(
  "contacts/loadContacts",
  async (user: User) => {
    const response = await axios.get(`${SERVER_URL}/users`, {
      headers: {
        'userid': user.id,
      }
    });
    return response.data;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    updateContact(state, action: PayloadAction<Message>) {
      const message = action.payload;
      state.contacts = state.contacts.map((contact : ContactInfoProps) => {
        if (contact.userID === message.senderID) {
          return {
            ...contact,
            latestMessage: message.text || (message.mediaUri ? "[Media]" : ""),
            time: message.timestamp,
            unreadMessages: contact.unreadMessages + 1,
          };
        }
        return contact;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(loadContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch contacts!";
      });
  },
});

export const { updateContact } = contactsSlice.actions;
export default contactsSlice.reducer;
