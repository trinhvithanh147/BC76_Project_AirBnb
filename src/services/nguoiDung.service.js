import { http } from "./config";

export const nguoiDungService = {
  layDanhSachNguoiDung: () => {
    return http.get("/users");
  },
  xoaNguoiDung: (id) => {
    return http.delete(`/users?id=${id}`);
  },
  capNhatNguoiDung : (id,value) =>{
    return http.put(`/users/${id}`,value);
  },
  
};
