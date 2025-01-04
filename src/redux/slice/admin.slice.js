import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).user
    : null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    handleAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});
export const { handleAdmin } = adminSlice.actions;
export default adminSlice.reducer;
