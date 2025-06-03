import { imagesApi } from "@/api/imagesApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const getImages = (sort: 'asc' | 'desc' = 'desc') => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['images', sort],
        queryFn: () => imagesApi.getImages(sort),
    });
    return { data, isLoading, error };
};

const saveImage = () => {
    return useMutation({
        mutationFn: (data: FormData) => imagesApi.saveImage(data),
        onSuccess: () => {
            toast.success("Lưu ảnh thành công");
        },  
        onError: (error: any) => {
            toast.error(error.response.data.message);
        },
    });
};

const getImageById = (id: string) => {
    return useQuery({
        queryKey: ['imageById'],
        queryFn: () => imagesApi.getImageById(id),
    });
};

const deleteImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => imagesApi.deleteImage(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['images'] });
            toast.success("Thành công");
        },
        onError: (error: any) => {
            toast.error(error.response.data.message);
        },
    });
};

  

export const useImagesHook = {
  getImages,
  saveImage,
  getImageById,
  deleteImage,
};
