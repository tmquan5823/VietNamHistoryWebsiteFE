import React from "react";
import SectionContainer from "../../../components/common/SectionContainer";
import { Quiz } from "@/dataHelper/dashboard.dataHelper";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "@/constant";
interface QuizSectionProps {
  data: Quiz | null;
}

const QuizSection: React.FC<QuizSectionProps> = ({ data }) => {
  const navigate = useNavigate();
  const quiz = data;
  if (!quiz) {
    return (
      <SectionContainer
        title="Bộ câu hỏi câu hỏi lịch sử"
        subtitle="Thử thách kiến thức lịch sử của bạn với các bộ câu hỏi thú vị, cập nhật thường xuyên"
        className="bg-[#ffffff]"
      >
        <div className="text-center text-gray-500 py-8">
          Không có bộ câu hỏi nào.
        </div>
      </SectionContainer>
    );
  }

  const leaderboard = quiz.leaderboard || [];

  return (
    <SectionContainer
      title="Bộ câu hỏi câu hỏi lịch sử"
      subtitle="Thử thách kiến thức lịch sử của bạn với các bộ câu hỏi thú vị, cập nhật thường xuyên"
      className="bg-[#ffffff]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* Quiz Card */}
        <div className="bg-[#FDDAA7] rounded-lg p-4 shadow-lg flex flex-col h-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#5D4137]">
              {quiz.title}
            </h2>
            <span className="text-[#D12827] font-semibold text-sm sm:text-base">
              {quiz.playerCount} Người tham gia
            </span>
          </div>
          <div className="mb-4">
            <img
              src={
                quiz.image ||
                import.meta.env.VITE_BASE_URL + "images/quiz-default.jpg"
              }
              alt="Quiz"
              className="w-full h-48 sm:h-64 object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2 justify-between flex-grow">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#5D4137]">
                {quiz.title}
              </h3>
              <p className="text-[#5D4137]/80 text-sm sm:text-base">
                {quiz.description}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-7 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition w-full sm:w-auto"
                style={{ minWidth: 160 }}
                onClick={() => {
                  navigate(
                    ROUTERS.QUIZ_PLAY.replace(":id", quiz.id.toString())
                  );
                }}
              >
                Tham gia chơi
              </button>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-[#FDDAA7]/20 rounded-lg p-4 sm:p-6 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold text-[#5D4137] mb-4">
            Bảng xếp hạng
          </h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Table Header */}
            <div className="flex items-center justify-between py-2 border-b-2 border-[#5D4137]/50 font-semibold text-[#5D4137] text-sm sm:text-base">
              <div className="flex items-center gap-2 sm:gap-3 flex-1">
                <span className="min-w-[24px] sm:min-w-[32px] text-center">
                  #
                </span>
                <span>Người chơi</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 min-w-[100px] sm:min-w-[140px] justify-end">
                <span className="text-center">Điểm</span>
                {/* <span className="text-center hidden sm:block">Thời gian</span> */}
              </div>
            </div>

            {/* Table Content */}
            {leaderboard.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                Chưa có người chơi nào.
              </div>
            ) : (
              leaderboard.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 border-b border-gray-200 text-sm sm:text-base hover:bg-[#FDDAA7]/10 transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-3 flex-1">
                    <span className="font-bold text-[#D12827] min-w-[24px] sm:min-w-[32px] text-center">
                      {index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex-shrink-0">
                        <img
                          src={
                            item.user.avatar ||
                            import.meta.env.VITE_BASE_URL +
                              "images/default-avatar.png"
                          }
                          alt="Avatar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <span className="font-medium line-clamp-1">
                        {item.user.fullname}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 min-w-[100px] sm:min-w-[140px] justify-end">
                    <div className="font-bold text-[#5D4137] text-center">
                      {item.score} điểm
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default QuizSection;
