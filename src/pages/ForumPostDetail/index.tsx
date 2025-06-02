import React from "react";
import { useParams } from "react-router-dom";
import { CiTimer } from "react-icons/ci";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useForumPostHook } from "@/hooks/useForumPostHook";
import PageContainer from "@/components/common/PageContainer";
import BackButton from "@/components/ui/backButton";
import Loading from "@/components/common/Loading";

const ForumDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useForumPostHook.useGetPostById(
    Number(id)
  );
  const { mutate: savePost, isPending: isSaving } =
    useForumPostHook.useSaveForumPost();
  const { mutate: unsavePost, isPending: isUnsaving } =
    useForumPostHook.useDeleteSavedForumPost();

  if (isLoading) return <Loading />;
  if (error)
    return <div>Không tìm thấy bài viết hoặc bạn không có quyền xem.</div>;
  if (!data?.data) return <div>Không có dữ liệu.</div>;

  const post = data.data;

  const handleSave = () => {
    if (!post.is_saved) {
      savePost(post.id);
    } else {
      unsavePost(post.id);
    }
  };

  return (
    <PageContainer>
      <div className="w-full flex justify-start mb-4">
        <BackButton className="!bg-transparent !px-0 !py-0 !shadow-none !hover:bg-neutral-100" />
      </div>
      <div className="bg-[#FFF8F2] rounded-lg p-6 shadow w-full">
        {/* Mục 1: Tiêu đề + topics */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2 relative">
            <h1 className="text-2xl font-bold text-[#5D4037]">{post.title}</h1>
            <button
              className={`absolute top-0 right-0 px-2 py-1 rounded flex items-center gap-1 text-xs font-semibold transition z-10 ${
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
          </div>
          <div className="flex flex-wrap gap-2">
            {post.topics?.map((topic) => (
              <span
                key={topic.id}
                className="bg-[#FDDAA7] text-[#5D4037] px-2 py-0.5 rounded text-xs font-medium"
              >
                {topic.name}
              </span>
            ))}
          </div>
        </div>
        {/* Mục 2: User */}
        <div className="mb-8 flex items-center gap-2 border-b border-neutral-200 pb-4">
          {post.creator?.avatar && (
            <img
              src={post.creator.avatar}
              alt={post.creator.fullname}
              className="w-8 h-8 rounded-full object-cover border border-neutral-300 mx-2"
            />
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-[#D12827]">
              {post.creator?.fullname}
            </span>
            <span className="text-xs text-neutral-500">
              {post.creator?.email}
            </span>
          </div>
          <span className="flex items-center ml-4">
            <CiTimer className="text-base text-[#D12827] mr-1" />
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("vi-VN")
              : ""}
          </span>
        </div>
        {/* Mục 3: Nội dung */}
        <div className="prose max-w-none text-[#5D4037] mb-6">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        {/* Nếu có phần bình luận, render ở đây */}
      </div>
    </PageContainer>
  );
};

export default ForumDetail;
