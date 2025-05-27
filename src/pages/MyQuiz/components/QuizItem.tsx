import { QuizSet } from "@/dataHelper/quizSet.dataHelper";
import React from "react";
import { ROUTERS, statusMap } from "@/constant";
import { useNavigate } from "react-router-dom";
import { FaQuestion } from "react-icons/fa6";
import { CiTimer } from "react-icons/ci";

interface QuizItemProps {
  quiz: QuizSet;
  onPublishQuiz: (id: number) => void;
  onUnpublishQuiz: (id: number) => void;
  onDeleteQuizSet: (id: number) => void;
}

const QuizItem: React.FC<QuizItemProps> = ({
  quiz,
  onPublishQuiz,
  onUnpublishQuiz,
  onDeleteQuizSet,
}) => {
  const navigate = useNavigate();
  const handlePublishQuiz = (id: number) => {
    onPublishQuiz(id);
  };
  const handleUnpublishQuiz = (id: number) => {
    onUnpublishQuiz(id);
  };
  const handleDeleteQuizSet = (id: number) => {
    onDeleteQuizSet(id);
  };

  return (
    <div className="bg-white rounded-lg shadow border border-neutral-200 p-4 flex flex-col md:flex-row gap-4 items-center">
      <img
        src={quiz.image}
        alt={quiz.title}
        className="w-40 h-40 rounded object-cover border border-neutral-300 bg-neutral-100 flex-shrink-0"
      />
      <div className="flex-1 w-full flex flex-col h-full">
        <div className="flex items-start justify-between w-full mb-1">
          <h2 className="text-lg font-semibold text-[#D12827] flex-1 pr-2 line-clamp-2 break-all">
            {quiz.title}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium select-none mr-3
                ${
                  quiz.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : quiz.status === "pending"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              style={{ cursor: "default" }}
            >
              {statusMap[quiz.status] || quiz.status}
            </span>
            {quiz.status === "unpublish" && (
              <button
                onClick={() => {
                  handlePublishQuiz(quiz.id);
                }}
                className="px-2 py-1 rounded bg-blue-500 text-white text-xs font-bold shadow border border-blue-700 hover:bg-blue-400 hover:shadow-lg transition"
              >
                Chia sẻ công khai
              </button>
            )}
            {quiz.status === "pending" && (
              <button
                onClick={() => {
                  handleUnpublishQuiz(quiz.id);
                }}
                className="px-2 py-1 rounded bg-gray-400 text-white text-xs font-bold shadow border border-gray-600 hover:bg-gray-300 hover:shadow-lg transition"
              >
                Hủy chia sẻ công khai
              </button>
            )}
          </div>
        </div>
        <p className="text-sm text-neutral-700 mb-1 line-clamp-3 break-all">
          {quiz.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-1">
          {quiz.topics &&
            quiz.topics.length > 0 &&
            quiz.topics.map((topic) => (
              <span
                key={topic.id}
                className="bg-[#FDDAA7] text-[#5D4037] px-2 py-0.5 rounded text-xs font-medium"
              >
                {topic.name}
              </span>
            ))}
        </div>
        <div className="flex items-center justify-between mt-auto mb-0">
          <div className="flex items-center text-xs text-neutral-600 gap-4">
            <span className="flex items-center gap-1">
              <FaQuestion className="text-base text-[#D12827]" />
              {quiz.questionCount ?? 0} Câu hỏi
            </span>
            <span className="flex items-center gap-1">
              <CiTimer className="text-base text-[#D12827]" />
              {new Date(quiz.createdAt).toLocaleString("vi-VN")}
            </span>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              className="px-3 py-1 rounded bg-neutral-200 text-[#5D4037] text-xs font-semibold hover:bg-neutral-300 transition"
              onClick={() => {
                navigate(
                  `${ROUTERS.MY_QUIZ_DETAIL.replace(":id", quiz.id.toString())}`
                );
              }}
            >
              Xem
            </button>
            <button
              onClick={() => {
                navigate(
                  `${ROUTERS.QUIZ_UPDATE.replace(":id", quiz.id.toString())}`
                );
              }}
              className="px-3 py-1 rounded bg-yellow-400 text-white text-xs font-semibold hover:bg-yellow-500 transition"
            >
              Cập nhật
            </button>
            <button
              onClick={() => {
                handleDeleteQuizSet(quiz.id);
              }}
              className="px-3 py-1 rounded bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizItem;
