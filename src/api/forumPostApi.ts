import axiosClient from "./axiosClient";
import { ForumPost, ForumPostCreateParams } from "@/dataHelper/forumPost.dataHelper";
import { ResponseData } from "@/utils/type";



export const forumPostApi = {
  getForumPosts: (): Promise<ResponseData<ForumPost[]>> =>
    axiosClient.get("/forum-posts"),
  createPost: (data: ForumPostCreateParams): Promise<ResponseData<ForumPost>> =>
    axiosClient.post("/forum-posts", data),
}; 