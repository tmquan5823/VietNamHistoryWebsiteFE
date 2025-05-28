import React, { useState } from "react";
import QuizList from "./components/quizList";
import Action from "./components/Action";
import { useQuizSetHook } from "@/hooks/useQuizSetHook";
import Pagination from "@/components/common/Pagination";
import { useTopicHook } from "@/hooks/useTopicHook";
import { removeQuizEditDraft } from "@/utils/storage";
const MyPost: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("createdAt_DESC");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

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

  const handleResetFilters = () => {
    setSearch("");
    setSearchInput("");
    setTopic("");
    setStatus("");
    setSort("newest");
    setPage(1);
  };

  const { mutate: publishQuiz } = useQuizSetHook.submitApprovalQuizSetQuery();
  const handlePublishQuiz = (id: number) => {
    publishQuiz(id);
  };

  const { mutate: unpublishQuiz } = useQuizSetHook.unpublishQuizSetQuery();
  const handleUnpublishQuiz = (id: number) => {
    unpublishQuiz(id);
  };

  let sort_by = undefined;
  let sort_order = undefined;
  if (sort) {
    const lastUnderscore = sort.lastIndexOf("_");
    if (lastUnderscore !== -1) {
      sort_by = sort.substring(0, lastUnderscore);
      sort_order = sort.substring(lastUnderscore + 1);
    }
  }

  const queryParams = {
    search: search ? search : undefined,
    topic_id: topic ? topic : undefined,
    status: status ? status : undefined,
    sort_by,
    sort_order,
    page,
    limit,
  };

  const { data: quizSets, isLoading } =
    useQuizSetHook.quizSetQuery(queryParams);
  const dataQuizSets = quizSets?.data;

  const { data: topics } = useTopicHook.topicQuery();

  const totalPages = dataQuizSets
    ? Math.ceil(dataQuizSets.total / dataQuizSets.limit)
    : 1;

  const { mutate: deleteQuizSet } = useQuizSetHook.deleteQuizSetQuery();
  const handleDeleteQuizSet = (id: number) => {
    deleteQuizSet(id);
    removeQuizEditDraft(id);
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
              {dataQuizSets?.data && dataQuizSets.data.length > 0 ? (
                <>
                  <QuizList
                    quizzes={dataQuizSets.data}
                    onPublishQuiz={handlePublishQuiz}
                    onUnpublishQuiz={handleUnpublishQuiz}
                    onDeleteQuizSet={handleDeleteQuizSet}
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

export default MyPost;
