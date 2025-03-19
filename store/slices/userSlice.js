import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// تأخير إعادة تعيين `wrongTime`
export const resetWrongTimeAfterDelay = createAsyncThunk(
  "user/resetWrongTimeAfterDelay",
  async (_, { dispatch }) => {
    await new Promise((resolve) => setTimeout(resolve, 30000));
    dispatch(setWrongTime(0));
  }
);

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
    },
    setWrongTime: (state, action) => {
      state.wrongTime = action.payload;
    },
    logoutUser: (state) => {
      state.userData = null;
      state.wrongTime = 0;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetWrongTimeAfterDelay.fulfilled, (state) => {
      state.wrongTime = 0;
    });
  },
});

export const { setUser, setWrongTime, logoutUser, setIsLoading } =
  userSlice.actions;
export default userSlice.reducer;
