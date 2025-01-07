import { http } from "./config";

export const phongService = {
  phongThue: () => {
    return http.get(`/phong-thue`);
  },
  xoaphongThue: (id) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    console.log(token);
    return http.delete(`/phong-thue/${id}`, {
      headers: {
        token: token,
      },
    });
  },
  capNhatPhongThue: (id, values) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    console.log(token);
    return http.put(`/phong-thue/${id}`, values, {
      headers: {
        token: token,
      },
    });
  },
  themPhongThue: (values) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    console.log(token);
    return http.put(`/phong-thue`, values, {
      headers: {
        token: token,
      },
    });
  },
  getPhong: () => {
    return http.get(`/phong-thue`);
  },
  getPhongTheoMaViTri: (maViTri) => {
    return http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`);
  },
  getPhongTheoMaPhong: (maPhong) => {
    return http.get(`/phong-thue/${maPhong}`);
  },
};
