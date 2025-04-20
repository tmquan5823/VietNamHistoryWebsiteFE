import React from "react";
import SectionContainer from "../../../components/common/SectionContainer";
import Button from "@/components/ui/button";

const QuizSection: React.FC = () => {
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
              Bộ câu hỏi mới nhất
            </h2>
            <span className="text-[#D12827] font-semibold text-sm sm:text-base">
              100 Người tham gia
            </span>
          </div>
          <div className="mb-4">
            <img
              src={import.meta.env.VITE_BASE_URL + "images/quiz-default.jpg"}
              alt="Quiz"
              className="w-full h-48 sm:h-64 object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2 justify-between flex-grow">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#5D4137]">
                Bộ câu hỏi tổng hợp lịch sử Việt Nam
              </h3>
              <p className="text-[#5D4137]/80 text-sm sm:text-base">
                50 câu hỏi
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <Button size="lg" className="font-semibold w-full sm:w-auto">
                Bắt đầu
              </Button>
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
                <span className="text-center hidden sm:block">Thời gian</span>
              </div>
            </div>

            {/* Table Content */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
              <div
                key={index}
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
                          import.meta.env.VITE_BASE_URL +
                          "images/default-avatar.png"
                        }
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <span className="font-medium line-clamp-1">
                      Nguyễn Văn A
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 min-w-[100px] sm:min-w-[140px] justify-end">
                  <div className="font-bold text-[#5D4137] text-center">
                    95 điểm
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm text-center hidden sm:block">
                    13/4/2024
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default QuizSection;
