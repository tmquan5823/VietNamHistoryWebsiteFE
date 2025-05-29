import axiosClient from "./axiosClient";
import { ForumPost, ForumPostCreateParams, ForumPostResponse } from "@/dataHelper/forumPost.dataHelper";
import { ResponseData } from "@/utils/type";



export const forumPostApi = {
  getForumPosts: (params?: any): Promise<ResponseData<ForumPostResponse>> =>
    axiosClient.get("/forum-posts/getByToken", { params }),
  createPost: (data: ForumPostCreateParams): Promise<ResponseData<ForumPost>> =>
    axiosClient.post("/forum-posts", data),
  deletePost: (id: number): Promise<ResponseData<ForumPost>> =>
    axiosClient.delete(`/forum-posts/${id}`),
  updatePost: (id: number, data: ForumPostCreateParams): Promise<ResponseData<ForumPost>> =>
    axiosClient.put(`/forum-posts/${id}`, data),
  getPostById: (id: number): Promise<ResponseData<ForumPost>> =>
    axiosClient.get(`/forum-posts/${id}`),
  cancelPost: (id: number): Promise<ResponseData<ForumPost>> =>
    axiosClient.put(`/forum-posts/${id}/cancel`),
  submitPost: (id: number): Promise<ResponseData<ForumPost>> =>
    axiosClient.put(`/forum-posts/${id}/submit`),
  getApprovedForumPosts: (params?: any): Promise<ResponseData<ForumPostResponse>> =>
    axiosClient.get("/forum-posts/approved", { params }),
}; 