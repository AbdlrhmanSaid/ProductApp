import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  wrongTime: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setWrongTime: (state, action) => {
      state.wrongTime = action.payload;

      if (state.wrongTime >= 3) {
        setTimeout(() => {
          state.wrongTime = 0;
        }, 60000);
      }
    },
    logoutUser: (state) => {
      state.userData = null;
      state.wrongTime = 0;
    },
  },
});

export const { setUser, setWrongTime, logoutUser } = userSlice.actions;
export default userSlice.reducer;
