import React from "react";
import { FiSearch } from "react-icons/fi";
import Select from "react-select";
import { Topic } from "@/dataHelper/topic.dataHelper";

type ActionProps = {
  search: string;
  onSearchSubmit: (e: React.FormEvent) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTopicChange: (value: string) => void;
  onResetFilters: () => void;
  topics: Topic[];
  topic: string;
};

function Action({
  search,
  onSearchSubmit,
  handleSearchChange,
  topics,
  handleTopicChange,
  onResetFilters,
  topic,
}: ActionProps) {
  const topicOptions = [
    { value: "", label: "Tất cả chủ đề" },
    ...topics?.map((topic) => ({
      value: String(topic.id),
      label: topic.name,
    })),
  ];

  const selectStyles = {
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
              placeholder="Tìm kiếm"
              className="flex-1 min-w-0 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-400 h-10"
              aria-label="Tìm kiếm quiz"
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
        <label
          htmlFor="topic-select"
          className="block text-sm font-semibold text-[#5D4037] mb-1"
        >
          Lọc theo chủ đề
        </label>
        <Select
          inputId="topic-select"
          options={topicOptions}
          value={
            topicOptions.find((o) => String(o.value) === String(topic)) ||
            topicOptions[0]
          }
          onChange={(option) =>
            handleTopicChange(option ? String(option.value) : "")
          }
          isSearchable
          classNamePrefix="react-select"
          styles={selectStyles}
        />
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
