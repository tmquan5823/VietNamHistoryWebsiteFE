import React, { useState } from "react";
import Action from "./components/Action";
import Pagination from "@/components/common/Pagination";
import { useTopicHook } from "@/hooks/useTopicHook";
import { useForumPostHook } from "@/hooks/useForumPostHook";
import PostList from "./components/PostList";
import ConfirmModal from "@/components/common/ConfirmModal";

const MyPost: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("createdAt_DESC");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  let sort_by = undefined;
  let sort_order = undefined;
  if (sort) {
    const lastUnderscore = sort.lastIndexOf("_");
    if (lastUnderscore !== -1) {
      sort_by = sort.substring(0, lastUnderscore);
      sort_order = sort.substring(lastUnderscore + 1);
    }
  }

  const { data: forumPosts, isLoading } = useForumPostHook.forumPostQuery({
    page,
    limit,
    search,
    topic_id: topic,
    status,
    sort_by,
    sort_order,
  });
  console.log("[DEBUG] forumPosts:", forumPosts);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };
  const handleTopicChange = (value: string) => {
    setTopic(value);
    setPage(1);
  };
  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };
  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  const { mutate: cancelPost } = useForumPostHook.useCancelForumPost();
  const handleCancelPost = (id: number) => {
    cancelPost(id);
  };

  const { mutate: submitPost } = useForumPostHook.useSubmitForumPost();
  const handleSubmitPost = (id: number) => {
    submitPost(id);
  };

  const handleResetFilters = () => {
    setSearch("");
    setSearchInput("");
    setTopic("");
    setStatus("");
    setSort("newest");
    setPage(1);
  };

  const { data: topics } = useTopicHook.topicQuery();
  const { mutate: deletePost } = useForumPostHook.useDeleteForumPost();
  const totalPages = forumPosts?.data?.totalPages || 1;
  const currentPage = forumPosts?.data?.page || page;

  const handleEditPost = (id: number) => {
    console.log("Edit post with id:", id);
  };

  const handleDeletePost = (id: number) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleViewPost = (id: number) => {
    console.log("View post with id:", id);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      deletePost(deleteId);
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="max-w-[1280px] mx-auto py-8 px-2">
      <div className="flex gap-8 items-start">
        <div className="w-full max-w-xs">
          <Action
            search={searchInput}
            onSearchSubmit={handleSearchSubmit}
            handleSearchChange={handleSearchChange}
            status={status}
            sort={sort}
            handleTopicChange={handleTopicChange}
            handleStatusChange={handleStatusChange}
            handleSortChange={handleSortChange}
            onResetFilters={handleResetFilters}
            topics={topics ?? []}
            topic={topic}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6 text-[#5D4037] w-full">
            Tất cả bài viết của bạn
          </h1>
          {isLoading ? (
            <div>Đang tải dữ liệu...</div>
          ) : (
            <>
              {forumPosts?.data && forumPosts.data.data.length > 0 ? (
                <>
                  <PostList
                    posts={forumPosts?.data?.data ?? []}
                    onEdit={handleEditPost}
                    onDelete={handleDeletePost}
                    onView={handleViewPost}
                    onCancel={handleCancelPost}
                    onSubmit={handleSubmitPost}
                  />
                  {totalPages > 1 && (
                    <Pagination
                      page={currentPage}
                      totalPages={totalPages}
                      onPageChange={setPage}
                    />
                  )}
                  <ConfirmModal
                    open={showConfirm}
                    title="Xác nhận xóa bài viết"
                    description="Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác."
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    confirmText="Xóa"
                    cancelText="Hủy"
                    confirmClass="bg-red-500 text-white hover:bg-red-600"
                  />
                </>
              ) : (
                <div className="flex justify-center items-center h-20">
                  <p className="text-gray-500">Không có dữ liệu</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPost;
