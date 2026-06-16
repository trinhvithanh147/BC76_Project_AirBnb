import axios from "axios";

export const http = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  timeout: 30000,
  headers: {
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3NiIsIkhldEhhblN0cmluZyI6IjI1LzA0LzIwMzAiLCJIZXRIYW5UaW1lIjoiMTc0NTUzOTIwMDAwMCIsIm5iZiI6MTcxNzA4ODQwMCwiZXhwIjoxNzQ1Njg2ODAwfQ.yy8aHWbOtw4ilJ0qdIgqQVut2TSF2s9Iuu0kgqbcYlg",
  },
});
