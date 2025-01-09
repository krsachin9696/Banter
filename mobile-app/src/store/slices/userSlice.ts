import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: User = {
  id: null,
  name: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    clearUser(state) {
      state.id = null;
      state.name = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
