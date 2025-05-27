import React from "react";
import { FaQuestion } from "react-icons/fa6";
import { CiTimer } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { QuizSetForPlay } from "@/dataHelper/quizSet.dataHelper";
import { ROUTERS } from "@/constant";
import { useUserStore } from "@/store/useUserStore";

type QuizListProps = {
  quizzes: QuizSetForPlay[];
};

const QuizList: React.FC<QuizListProps> = ({ quizzes }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  return (
    <main className="flex-1">
      <h2 className="text-xl font-bold text-neutral-800 mb-4">
        Tất cả Bộ câu hỏi
      </h2>
      <div className="flex flex-col gap-4">
        {quizzes.length === 0 ? (
          <div className="text-neutral-500 text-center py-8">
            Không tìm thấy Bộ câu hỏi phù hợp.
          </div>
        ) : (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-lg shadow border border-neutral-200 p-4 flex flex-col md:flex-row gap-4 items-center relative h-full"
              style={{ minHeight: 180 }}
            >
              <img
                src={quiz.image}
                alt={quiz.title}
                className="w-40 h-40 rounded object-cover border border-neutral-300 bg-neutral-100 flex-shrink-0"
              />
              <div className="flex-1 h-40 w-full flex flex-col relative justify-between">
                <div>
                  <div className="flex items-start justify-between w-full mb-1">
                    <h2 className="text-lg font-semibold text-[#D12827] flex-1 pr-2 line-clamp-2 break-all">
                      {quiz.title}
                    </h2>
                    {user && quiz.creator?.id === user.id && (
                      <span className="ml-2 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold border border-green-300">
                        Bộ câu hỏi của bạn
                      </span>
                    )}
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
                    {!quiz.topics && quiz.topics && (
                      <span className="bg-[#FDDAA7] text-[#5D4037] px-2 py-0.5 rounded text-xs font-medium">
                        {quiz.topics}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mt-auto pt-2">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-4 text-xs text-neutral-600">
                      <span className="flex items-center gap-1">
                        <FaQuestion className="text-base text-[#D12827]" />
                        {quiz.questionCount ?? 0} Câu hỏi
                      </span>
                      <span className="flex items-center gap-1">
                        <CiTimer className="text-base text-[#D12827]" />
                        {quiz.createdAt
                          ? new Date(quiz.createdAt).toLocaleString("vi-VN")
                          : ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#D12827"
                            d="M12 12c2.7 0 8 1.34 8 4v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2c0-2.66 5.3-4 8-4Zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
                          />
                        </svg>
                        {quiz.playerCount ?? 0} người chơi
                      </span>
                    </div>
                    {quiz.leaderboard &&
                      Object.keys(quiz.leaderboard).length > 0 && (
                        <div className="mt-1 text-xs">
                          {"is_finished" in quiz.leaderboard ? (
                            quiz.leaderboard.is_finished ? (
                              <span className="text-green-600 font-semibold">
                                Đã hoàn thành
                              </span>
                            ) : (
                              <span className="text-yellow-600 font-semibold">
                                Chưa hoàn thành
                              </span>
                            )
                          ) : null}
                          {"score" in quiz.leaderboard && (
                            <>
                              {" - "}
                              Điểm: <b>{quiz.leaderboard.score}</b>
                            </>
                          )}
                          {"ranking" in quiz.leaderboard &&
                            typeof quiz.leaderboard.ranking === "number" &&
                            quiz.leaderboard.ranking > 0 && (
                              <>
                                {" | Xếp hạng: "}
                                <b>{quiz.leaderboard.ranking}</b>
                              </>
                            )}
                        </div>
                      )}
                    <span className="text-xs text-neutral-400 mt-1">
                      Bởi{" "}
                      <span className="text-red-600 font-medium">
                        {quiz.creator?.fullname || ""}
                      </span>
                    </span>
                  </div>
                  <button
                    className="px-7 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    style={{ minWidth: 160 }}
                    onClick={() => {
                      navigate(
                        `${ROUTERS.QUIZ_PLAY.replace(
                          ":id",
                          quiz.id.toString()
                        )}`
                      );
                    }}
                  >
                    Tham gia chơi
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default QuizList;
