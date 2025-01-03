import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactsState {
  contacts: ContactInfoProps[];
}

const initialState: ContactsState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<ContactInfoProps[]>) {
      state.contacts = action.payload;
    },
    updateContact(state, action: PayloadAction<Message>) {
      const message = action.payload;

      // Use map to create a new array where we update the specific contact's latestMessage and time
      state.contacts = state.contacts.map((contact) => {
        if (contact.userID === message.senderID) {
          return {
            ...contact,
            latestMessage: message.text || (message.mediaUri ? "[Media]" : ""),
            time: message.timestamp,
          };
        }
        return contact; 
      });
    },
  },
});

export const { setContacts, updateContact } = contactsSlice.actions;
export default contactsSlice.reducer;
