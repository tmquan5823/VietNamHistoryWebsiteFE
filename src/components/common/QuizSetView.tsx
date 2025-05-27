import React from "react";
import { FaQuestion } from "react-icons/fa6";
import { CiTimer } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { QuizSet } from "@/dataHelper/quizSet.dataHelper";

interface QuizSetViewProps {
  quizSetData: QuizSet;
  onPlay?: () => void;
}

const QuizSetView: React.FC<QuizSetViewProps> = ({
  quizSetData,
  onPlay,
}) => {
  if (!quizSetData) return null;
  return (
    <div className="w-full bg-white rounded-lg shadow-2xl border-2 border-[#D12827] p-6 mt-6 transition-transform duration-200 hover:scale-[1.01]">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src={quizSetData?.image}
          alt={quizSetData?.title}
          className="w-40 h-40 rounded object-cover border border-neutral-300 bg-neutral-100 flex-shrink-0 self-center md:self-start"
        />
        <div className="flex-1 flex flex-col gap-2 h-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h1 className="text-2xl font-bold text-[#D12827] break-words break-all md:max-w-[70%]">
              {quizSetData?.title}
            </h1>
          </div>
          <p className="text-sm text-neutral-700 whitespace-pre-line break-words break-all mb-2">
            {quizSetData?.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-1">
            {quizSetData?.topics?.map((topic: any) => (
              <span
                key={topic.id}
                className="bg-[#FDDAA7] text-[#5D4037] px-2 py-0.5 rounded text-xs font-medium"
              >
                {topic.name}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-600 justify-between mt-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <FaQuestion className="text-base text-[#D12827]" />
                {quizSetData.questionCount} Câu hỏi
              </span>
              <span className="flex items-center gap-1">
                <FaUserFriends className="text-base text-[#D12827]" />
                {quizSetData.playerCount ?? 0} người chơi
              </span>
              <span className="flex items-center gap-1">
                <CiTimer className="text-base text-[#D12827]" />
                {new Date(quizSetData.createdAt).toLocaleString("vi-VN")}
              </span>
            </div>
            <button
              className="bg-[#D12827] text-white font-bold text-base px-8 py-3 rounded hover:bg-red-600 transition w-fit ml-4"
              onClick={onPlay}
            >
              Tham gia chơi
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6 border-t pt-4">
        <img
          src={quizSetData?.creator?.avatar}
          alt={quizSetData?.creator?.fullname}
          className="w-12 h-12 rounded-full object-cover border border-neutral-300"
        />
        <div>
          <div className="font-semibold text-[#5D4037]">
            {quizSetData?.creator?.fullname}
          </div>
          <div className="text-xs text-neutral-500">
            {quizSetData?.creator?.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSetView;
