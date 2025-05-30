import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { profileApi } from "@/api/profileApi";
import { ChangePasswordParams } from "@/dataHelper/profile.dataHelper";

const profileQuery = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const response = await profileApi.getProfile();
        const apiResponse = response.data;

        return apiResponse;
      } catch (error) {
        throw error;
      }
    },
  });
};

const updateProfileMutation = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await profileApi.updateProfile(data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Cập nhật thành công");
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message);
    },
  });
};  

const changePasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: ChangePasswordParams) => {
      const response = await profileApi.changePassword(data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Đổi mật khẩu thành công");
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message);
    },
  });
};

export const useProfileHook = {
  profileQuery,
  updateProfileMutation,
  changePasswordMutation,
};
