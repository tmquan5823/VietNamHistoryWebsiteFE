import { forumPostApi } from "@/api/forumPostApi";
import { ROUTERS } from "@/constant";
import { ForumPostCreateParams } from "@/dataHelper/forumPost.dataHelper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const forumPostQuery = (params?: any) => {
    return useQuery({   
      queryKey: ["forumPost", params],
      queryFn: () => forumPostApi.getForumPosts(params),
    });
};

const useCreateForumPost = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data: ForumPostCreateParams) => forumPostApi.createPost(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["forumPost"] });
            navigate(ROUTERS.MY_POST);
            toast.success("Bài viết đã được tạo thành công");
        },
        onError: () => {
            toast.error("Lỗi khi tạo bài viết");
        },
    });
}

const useDeleteForumPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => forumPostApi.deletePost(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["forumPost"] });
            toast.success("Bài viết đã được xóa thành công");
        },
        onError: () => {
            toast.error("Lỗi khi xóa bài viết");
        },
    });
}

export const useForumPostHook = {
    useCreateForumPost,
    forumPostQuery,
    useDeleteForumPost,
}