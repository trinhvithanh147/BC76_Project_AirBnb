import { http } from "./config";

export const datPhongService = {
  datPhong: () => {
    return http.get("/dat-phong");
  },
  xoaDatPhong: (id) => {
    return http.delete(`/dat-phong/${id}`);
  },
  capNhatDatPhong: (id, value) => {
    return http.put(`/dat-phong/${id}`, value);
  },
  themDatPhong: (value) => {
    return http.post(`/dat-phong`, value);
  },
};
