import axiosClient from "./axiosClient";

export const notificationApi = {
  getNotifications: () => axiosClient.get("/notifications"),
  readNotification: (id: string) => axiosClient.put(`/notifications/${id}/read`),
}; 