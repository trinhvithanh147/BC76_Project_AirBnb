import { http } from "./config";

export const vitriService = {
  vitri: () => {
    return http.get("/vi-tri");
  },
  themviTri: (values) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    console.log(token);
    return http.post("/vi-tri", values, {
      headers: {
        token: token,
      },
    });
  },
  xoaviTri: (id) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    console.log(token);
    return http.delete(`/vi-tri/${id}`, {
      headers: {
        token: token,
      },
    });
  },
  capNhatviTri: (id, values) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    console.log(token);
    return http.put(`/vi-tri/${id}`, values, {
      headers: {
        token: token,
      },
    });
  },
};
