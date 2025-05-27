import React, { useState } from "react";
import Action from "./components/Action";
import QuizList from "./components/QuizList";
import PageContainer from "../../components/common/PageContainer";
import MyQuizCarousel from "./components/MyQuizCarousel";
import { useQuizSetHook } from "@/hooks/useQuizSetHook";
import Pagination from "@/components/common/Pagination";
import { useTopicHook } from "@/hooks/useTopicHook";

export const Quiz: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [topic, setTopic] = useState("");
  const [sort, setSort] = useState("createdAt_DESC");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [filterType, setFilterType] = useState("all");

  const { data: topics } = useTopicHook.topicQuery();

  let sort_by = undefined;
  let sort_order = undefined;
  if (sort) {
    const lastUnderscore = sort.lastIndexOf("_");
    if (lastUnderscore !== -1) {
      sort_by = sort.substring(0, lastUnderscore);
      sort_order = sort.substring(lastUnderscore + 1);
    }
  }

  const { data: publishedQuizSets } =
    useQuizSetHook.publishedQuizSetQuery({
      search,
      topic_id: topic,
      sort_by,
      sort_order,
      page,
      limit,
      filter_type: filterType,
    });
  console.log(publishedQuizSets);

  const { data: myQuizSets } = useQuizSetHook.quizSetQuery({
    status: "publish",
  });
  const totalPages = publishedQuizSets?.data
    ? Math.ceil(publishedQuizSets.data.total / publishedQuizSets.data.limit)
    : 1;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTopic(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    setSearchInput("");
    setTopic("");
    setSort("createdAt_DESC");
    setPage(1);
    setFilterType("all");
  };

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    setPage(1);
  };

  return (
    <PageContainer
      title="Bộ câu hỏi về lịch sử"
      info="Tham gia trả lời và đóng góp các bộ câu hỏi về lịch sử để giải trí và củng cố kiến thức"
    >
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4 w-full md:w-80 flex-shrink-0">
          <Action
            search={searchInput}
            topic={topic}
            sort={sort}
            topics={topics || []}
            handleSearchChange={handleSearchChange}
            handleTopicChange={handleTopicChange}
            handleSortChange={handleSortChange}
            onResetFilters={handleResetFilters}
            onSearchSubmit={handleSearchSubmit}
            filterType={filterType}
            handleFilterTypeChange={handleFilterTypeChange}
          />
          <MyQuizCarousel quizzes={myQuizSets?.data?.data || []} />
        </div>
        <div className="flex-1 flex flex-col">
          <QuizList quizzes={publishedQuizSets?.data?.data || []} />
          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
};
