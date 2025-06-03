import axiosClient from "./axiosClient";
import { ResponseData } from "../utils/type";
import { Image } from "../dataHelper/images.dataHelper";

export const imagesApi = {
  getImages: (sort: 'asc' | 'desc' = 'desc'): Promise<ResponseData<Image[]>> =>
    axiosClient.get(`/images?sort=${sort}`),
  saveImage: (data: FormData): Promise<ResponseData<Image>> =>
    axiosClient.post("/images", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  getImageById: (id: string): Promise<ResponseData<Image>> =>
    axiosClient.get(`/images/${id}`),
  deleteImage: (id: string): Promise<ResponseData<null>> =>
    axiosClient.delete(`/images/${id}`),
};
