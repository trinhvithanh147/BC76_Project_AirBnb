import { http } from "./config";

export const authService = {
  signIn: (value) => {
    return http.post("/auth/signin", value);
  },
};
