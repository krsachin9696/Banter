import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import contactsReducer from "./slices/contactsSlice";
import messagesReducer from "./slices/messagesSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
