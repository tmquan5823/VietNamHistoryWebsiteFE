import axiosClient from "./axiosClient";

export const imageApi = {
    uploadImage: (data: FormData) => {
        return axiosClient.post("/upload-image", data, {
            headers: { "Content-Type": undefined }
        });
    },
    deleteImage: (public_id: string) => {
        return axiosClient.delete("/upload-image", {
            data: { public_id }
        });
    }
}