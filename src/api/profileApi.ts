import { ChangePasswordParams, Profile } from "@/dataHelper/profile.dataHelper";
import axiosClient from "./axiosClient";
import { ResponseData } from "@/utils/type";

export const profileApi = {
    getProfile: (): Promise<ResponseData<Profile>> =>
      axiosClient.get("/profile"),
    updateProfile: (data: FormData): Promise<ResponseData<Profile>> =>
      axiosClient.put("/profile", data, {
        headers: { 'Content-Type': undefined },
      }),
    changePassword: (data: ChangePasswordParams): Promise<ResponseData<Profile>> =>
      axiosClient.put("/profile/change-password", data),
  };
  