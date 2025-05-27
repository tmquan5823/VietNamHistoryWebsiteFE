import { ROUTERS } from "@/constant";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Select from "react-select";
import { GroupBase, StylesConfig } from "react-select";

type ActionProps = {
  search: string;
  topic: string;
  sort: string;
  topics: { id: number; name: string }[];
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTopicChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onResetFilters: () => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  filterType: string;
  handleFilterTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function Action({
  search,
  topic,
  sort,
  topics,
  handleSearchChange,
  handleTopicChange,
  handleSortChange,
  onResetFilters,
  onSearchSubmit,
  filterType,
  handleFilterTypeChange,
}: ActionProps) {
  const navigate = useNavigate();

  // Các option cho sort và filterType
  const sortOptions = [
    { value: "createdAt_DESC", label: "Mới nhất" },
    { value: "createdAt_ASC", label: "Cũ nhất" },
    { value: "title_ASC", label: "Tên A-Z" },
    { value: "title_DESC", label: "Tên Z-A" },
    { value: "playerCount_DESC", label: "Phổ biến nhất" },
    { value: "score_DESC", label: "Điểm của bạn (cao nhất)" },
    { value: "ranking_ASC", label: "Xếp hạng của bạn (tốt nhất)" },
  ];

  const filterTypeOptions = [
    { value: "all", label: "Tất cả" },
    { value: "mine", label: "Bộ câu hỏi của tôi" },
    { value: "not_played", label: "Chưa chơi" },
    { value: "not_finished", label: "Chưa hoàn thành" },
    { value: "finished", label: "Đã hoàn thành" },
  ];

  const selectStyles: StylesConfig<any, false, GroupBase<any>> = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "#fff",
      borderColor: state.isFocused ? "#D12827" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px #D12827" : provided.boxShadow,
      "&:hover": {
        borderColor: "#D12827",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#FDDAA7"
        : state.isFocused
        ? "#FFEBC1"
        : undefined,
      color: "#5D4037",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#5D4037",
    }),
  };

  return (
    <aside className="w-full md:w-full flex-shrink-0">
      <button
        className={`w-full bg-[#D12827] hover:bg-[#D12827] text-white font-semibold py-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition`}
        aria-label="Tạo bộ quiz mới"
        tabIndex={0}
        onClick={() => navigate(ROUTERS.QUIZ_CREATE)}
      >
        Tạo bộ câu hỏi mới
      </button>
      <div className="bg-neutral-100 rounded-lg p-4 mb-4">
        <div className="font-semibold text-xl text-[#5D4037] mb-2 flex items-center gap-2">
          <FiSearch className="w-5 h-5 text-[#D12827]" />
          Tìm kiếm & lọc
        </div>
        <form className="mb-3 w-full" role="search" onSubmit={onSearchSubmit}>
          <div className="flex w-full gap-0 border border-neutral-300 rounded-md">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Tìm kiếm bộ câu hỏi"
              className="flex-1 min-w-0 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-400 h-10"
              aria-label="Tìm kiếm bộ câu hỏi"
            />
            <button
              type="submit"
              className="rounded bg-red-600 hover:bg-red-700 text-white h-10 p-2 flex items-center justify-center rounded-r-md focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Tìm kiếm"
              tabIndex={0}
            >
              <FiSearch className="w-5 h-5 text-[#fff]" />
            </button>
          </div>
        </form>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label
              htmlFor="topic-select"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Chủ đề
            </label>
            <Select
              inputId="topic-select"
              options={[
                { value: "", label: "Tất cả chủ đề" },
                ...topics.map((t) => ({ value: String(t.id), label: t.name })),
              ]}
              value={(() => {
                const opts = [
                  { value: "", label: "Tất cả chủ đề" },
                  ...topics.map((t) => ({
                    value: String(t.id),
                    label: t.name,
                  })),
                ];
                return opts.find((o) => o.value === topic) || opts[0];
              })()}
              onChange={(option) =>
                handleTopicChange({
                  target: { value: option ? option.value : "" },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
              isSearchable
              classNamePrefix="react-select"
              styles={selectStyles}
            />
          </div>
          <div>
            <label
              htmlFor="sort-select"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Sắp xếp
            </label>
            <Select
              inputId="sort-select"
              options={sortOptions}
              value={
                sortOptions.find((o) => o.value === sort) || sortOptions[0]
              }
              onChange={(option) =>
                handleSortChange({
                  target: { value: option ? option.value : "" },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
              isSearchable={false}
              classNamePrefix="react-select"
              styles={selectStyles}
            />
          </div>
          <div>
            <label
              htmlFor="filter-type-select"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Trạng thái
            </label>
            <Select
              inputId="filter-type-select"
              options={filterTypeOptions}
              value={
                filterTypeOptions.find((o) => o.value === filterType) ||
                filterTypeOptions[0]
              }
              onChange={(option) =>
                handleFilterTypeChange({
                  target: { value: option ? option.value : "" },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
              isSearchable={false}
              classNamePrefix="react-select"
              styles={selectStyles}
            />
          </div>
        </div>
        <button
          type="button"
          className="w-full mt-4 bg-neutral-300 hover:bg-neutral-400 text-[#5D4037] font-semibold py-2 rounded-lg transition"
          onClick={onResetFilters}
        >
          Đặt lại bộ lọc
        </button>
      </div>
    </aside>
  );
}

export default Action;
