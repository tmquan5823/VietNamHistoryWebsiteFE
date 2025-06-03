import React from "react";
import { ForumPost } from "@/dataHelper/forumPost.dataHelper";
import { ROUTERS } from "@/constant";
import { CiTimer } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useForumPostHook } from "@/hooks/useForumPostHook";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

interface PostItemProps {
  post: ForumPost;
  currentUserId?: number;
}

const PostItem: React.FC<PostItemProps> = ({ post, currentUserId }) => {
  const navigate = useNavigate();
  const { mutate: savePost, isPending: isSaving } =
    useForumPostHook.useSaveForumPost();
  const { mutate: unsavePost, isPending: isUnsaving } =
    useForumPostHook.useDeleteSavedForumPost();

  const handleView = () => {
    navigate(ROUTERS.FORUM_DETAIL.replace(":id", post.id.toString()));
  };
  const isCurrentUser =
    post.creator?.id && currentUserId && post.creator.id === currentUserId;

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!post.is_saved) {
      savePost(post.id);
    } else {
      unsavePost(post.id);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow border border-neutral-200 p-4 flex flex-col md:flex-row gap-4 items-center relative ${
        isCurrentUser ? "border-2 border-[#D12827]" : ""
      }`}
    >
      {/* Nút lưu/bỏ lưu góc trên phải */}
      <button
        className={`absolute top-3 right-3 px-2 py-1 rounded flex items-center gap-1 text-xs font-semibold transition ${
          post.is_saved
            ? "bg-[#D12827] text-white hover:bg-[#b71c1c]"
            : "bg-neutral-200 text-[#5D4037] hover:bg-neutral-300"
        }`}
        onClick={handleSave}
        disabled={isSaving || isUnsaving}
        title={post.is_saved ? "Bỏ lưu bài viết" : "Lưu bài viết"}
      >
        {post.is_saved ? <FaBookmark /> : <FaRegBookmark />}
        {post.is_saved ? "Đã lưu" : "Lưu bài"}
      </button>
      {/* Ảnh đại diện bài viết */}
      <img
        src={import.meta.env.BASE_URL + "/icons/blog.webp"}
        alt="blog icon"
        className="w-14 h-14 object-cover bg-neutral-100 flex-shrink-0"
      />
      <div className="flex-1 w-full flex flex-col h-full">
        <div className="flex items-center mb-2">
          <h2
            className="text-lg font-semibold text-[#5D4037] break-all cursor-pointer transition-colors duration-200 hover:text-[#D12827]"
            onClick={handleView}
          >
            {post.title}
          </h2>
          {isCurrentUser && (
            <span className="ml-3 px-2 py-0.5 rounded font-semibold bg-[#D12827] text-white text-xs flex items-center h-6 leading-6 select-none">
              Bài của bạn
            </span>
          )}
        </div>
        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-2">
          {post.topics &&
            post.topics.length > 0 &&
            post.topics.map((topic) => (
              <span
                key={topic.id}
                className="bg-[#FDDAA7] text-[#5D4037] px-2 py-0.5 rounded text-xs font-medium"
              >
                {topic.name}
              </span>
            ))}
        </div>
        <div className="flex items-center justify-between text-sm text-neutral-700 mt-2">
          <div className="flex items-center">
            <span>
              Tạo bởi:{" "}
              <span className="font-semibold text-[#D12827]">
                {post.creator?.fullname}
              </span>
            </span>
            <span className="mx-2">|</span>
            <span className="flex items-center text-xs text-neutral-600">
              <CiTimer className="text-base text-[#D12827] mr-1" />
              {post.createdAt
                ? new Date(post.createdAt).toLocaleString("vi-VN")
                : "Không xác định"}
            </span>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              className="px-3 py-1 rounded bg-neutral-200 text-[#5D4037] text-xs font-semibold hover:bg-neutral-300 transition"
              onClick={handleView}
            >
              Xem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
