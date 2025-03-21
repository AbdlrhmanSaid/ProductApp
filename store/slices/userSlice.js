import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  wrongTime: 0,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("user_data", JSON.stringify(action.payload));
      }
    },
    setWrongTime: (state, action) => {
      state.wrongTime = action.payload;
    },
    logoutUser: (state) => {
      state.userData = null;
      state.wrongTime = 0;
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("user_data");
      }
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setWrongTime, logoutUser, setIsLoading } =
  userSlice.actions;
export default userSlice.reducer;
