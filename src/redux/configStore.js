import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slice/admin.slice";

export const store = configureStore({
  reducer: {
    userInfo: userSlice,
    adminSlice,
  },
});
