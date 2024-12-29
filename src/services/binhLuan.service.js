import { http } from "./config";

export const binhLuanService = {
  getBinhLuanTheoMaPhong: (maPhong) => {
    return http.get(`/binh-luan/lay-binh-luan-theo-phong/${maPhong}`);
  },
};
