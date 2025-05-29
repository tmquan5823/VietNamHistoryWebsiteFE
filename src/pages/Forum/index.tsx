import React, { useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import { useForumPostHook } from "@/hooks/useForumPostHook";
import Action from "./components/Action";
import PostList from "./components/PostList";
import { useTopicHook } from "@/hooks/useTopicHook";
import Pagination from "@/components/common/Pagination";
import { useUserStore } from "@/store/useUserStore";

const Forum: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [topic, setTopic] = useState("");
  const [sort, setSort] = useState("createdAt_DESC");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [myPostsOnly, setMyPostsOnly] = useState(false);

  const { user } = useUserStore();

  let sort_by = undefined;
  let sort_order = undefined;
  if (sort) {
    const lastUnderscore = sort.lastIndexOf("_");
    if (lastUnderscore !== -1) {
      sort_by = sort.substring(0, lastUnderscore);
      sort_order = sort.substring(lastUnderscore + 1);
    }
  }

  const { data: forumPosts, isLoading } =
    useForumPostHook.useGetApprovedForumPosts({
      page,
      limit,
      search,
      topic_id: topic,
      sort_by,
      sort_order,
      ...(myPostsOnly && user?.id ? { user_id: user.id } : {}),
    });

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
  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };
  const handleResetFilters = () => {
    setSearch("");
    setSearchInput("");
    setTopic("");
    setSort("createdAt_DESC");
    setPage(1);
    setMyPostsOnly(false);
  };
  const handleMyPostsOnlyChange = (value: boolean) => {
    setMyPostsOnly(value);
    setPage(1);
  };

  const { data: topics } = useTopicHook.topicQuery();
  const totalPages = forumPosts?.data?.totalPages || 1;
  const currentPage = forumPosts?.data?.page || page;

  return (
    <PageContainer
      title="Diễn đàn lịch sử"
      info="Tham gia thảo luận, trao đổi và chia sẻ kiến thức lịch sử với cộng đồng"
    >
      <div className="w-full mx-auto py-8 px-2">
        <div className="flex gap-8 items-start">
          <div className="w-full max-w-xs">
            <Action
              search={searchInput}
              onSearchSubmit={handleSearchSubmit}
              handleSearchChange={handleSearchChange}
              sort={sort}
              handleTopicChange={handleTopicChange}
              handleSortChange={handleSortChange}
              onResetFilters={handleResetFilters}
              topics={topics ?? []}
              topic={topic}
              myPostsOnly={myPostsOnly}
              onMyPostsOnlyChange={handleMyPostsOnlyChange}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6 text-[#5D4037] w-full">
              Bài viết đã duyệt
            </h1>
            {isLoading ? (
              <div>Đang tải dữ liệu...</div>
            ) : (
              <>
                {forumPosts?.data && forumPosts.data.data.length > 0 ? (
                  <>
                    <PostList
                      posts={forumPosts?.data?.data ?? []}
                      currentUserId={user?.id}
                    />
                    {totalPages > 1 && (
                      <Pagination
                        page={currentPage}
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
    </PageContainer>
  );
};

export default Forum;
