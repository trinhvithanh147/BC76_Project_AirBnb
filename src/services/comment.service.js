import { http } from "./config";

export const commentService = {
  layDanhSachComment: () => {
    return http.get("/binh-luan");
  },
  themComment: (values) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    console.log(token);
    return http.post("/binh-luan", values, {
      headers: {
        token: token,
      },
    });
  },
  capNhatComment: (id, values) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    console.log(token);
    return http.put(`/binh-luan/${id}`, values, {
      headers: {
        token: token,
      },
    });
  },
  deleteComment: (id) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    console.log(token);
    return http.delete(`/binh-luan/${id}`, {
      headers: {
        token: token,
      },
    });
  },
};
