import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).user
    : null,
  token: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).token
    : null,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    handleUpdateUser: (state, action) => {
      state.user = action.payload;
    },
    handleUpdateToken: (state, action) => {
      state.token = action.payload;
    },
    /* Hàm update gọn hơn 
    handleUpdateUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    }, */
    handleDeleteUserInfo: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { handleUpdateUser, handleUpdateToken, handleDeleteUserInfo } =
  userSlice.actions;

export default userSlice.reducer;
