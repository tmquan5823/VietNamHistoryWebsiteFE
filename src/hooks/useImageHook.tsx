import { imageApi } from "@/api/imageApi";
import { useMutation } from "@tanstack/react-query";

const uploadImage = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await imageApi.uploadImage(data);
      return response;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

const deleteImage = () => {
  return useMutation({
    mutationFn: async (public_id: string) => {
      const response = await imageApi.deleteImage(public_id);
      return response;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
export const useImageHook = {
  uploadImage,
  deleteImage,
};
