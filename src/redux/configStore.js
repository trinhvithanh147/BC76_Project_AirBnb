import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slice/admin.slice";
import userSlice from "./slice/user.slice";

export const store = configureStore({
  reducer: {
    userInfo: userSlice,
    adminSlice,
  },
});
