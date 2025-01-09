import { http } from "./config";
export const viTriService = {
  getViTri: () => {
    return http.get(`/vi-tri`);
  },
  getViTriById: (id) => {
    return http.get(`/vi-tri/${id}`);
  },
  vitri: () => {
    return http.get(`/vi-tri`);
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
  themviTri: (values) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    console.log(token);
    return http.post(`/vi-tri/`, values, {
      headers: {
        token: token,
      },
    });
  },
  xoaViTri: (id) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    console.log(token);
    return http.delete(`/vi-tri/${id}`, {
      headers: {
        token: token,
      },
    });
  },
};
