import React, { useState } from "react";
import { useForumPostHook } from "@/hooks/useForumPostHook";
import Pagination from "@/components/common/Pagination";
import PostList from "./components/PostList";
import Action from "./components/Action";
import { useTopicHook } from "@/hooks/useTopicHook";
import BackButton from "@/components/ui/backButton";

const SavedPosts = () => {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data: topics } = useTopicHook.topicQuery();

  const {
    data: savedPostsRes,
    isLoading,
  } = useForumPostHook.useGetSavedForumPost({
    page,
    limit,
    search,
    topic_id: topic,
  });
  const savedPosts = savedPostsRes?.data;

  const pagedData = savedPosts?.data || [];
  const totalPages = savedPosts?.totalPages || 1;

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
  const handleResetFilters = () => {
    setSearch("");
    setSearchInput("");
    setTopic("");
    setPage(1);
  };

  return (
    <div className="max-w-[1280px] mx-auto py-8 px-2">
      <BackButton className="mb-4" />
      <div className="flex gap-8 items-start">
        <div className="w-full max-w-xs">
          <Action
            search={searchInput}
            onSearchSubmit={handleSearchSubmit}
            handleSearchChange={handleSearchChange}
            handleTopicChange={handleTopicChange}
            onResetFilters={handleResetFilters}
            topics={topics ?? []}
            topic={topic}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6 text-[#5D4037] w-full">
            Bài viết đã lưu
          </h1>
          {isLoading ? (
            <div>Đang tải dữ liệu...</div>
          ) : (
            <>
              {pagedData.length > 0 ? (
                <>
                  <PostList
                    posts={pagedData.map((item: any) => ({
                      ...item.post,
                      id: item.post_id,
                    }))}
                  />
                  {totalPages > 1 && (
                    <Pagination
                      page={page}
                      totalPages={totalPages}
                      onPageChange={setPage}
                    />
                  )}
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

export default SavedPosts;
