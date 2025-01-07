import { http } from "./config";

export const phongService = {
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
