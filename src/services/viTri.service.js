import { http } from "./config";

export const viTriService = {
  getViTri: () => {
    return http.get(`/vi-tri`);
  },
  getViTriById: (id) => {
    return http.get(`/vi-tri/${id}`);
  },
};
