import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiInbox } from "react-icons/fi";
import { ROUTERS } from "@/constant";
import { QuizSet } from "@/dataHelper/quizSet.dataHelper";

type MyQuizCarouselProps = {
  quizzes: QuizSet[];
};

const MyQuizCarousel: React.FC<MyQuizCarouselProps> = ({ quizzes }) => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = () => setCurrent((prev) => (prev + 1) % quizzes.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + quizzes.length) % quizzes.length);

  const handleNavigate = () => {
    navigate(
      ROUTERS.MY_QUIZ_DETAIL.replace(":id", quizzes[current].id.toString())
    );
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-lg mt-4 w-full">
      <div className="font-bold text-2xl text-[#5D4037] mb-6 text-center tracking-wide">
        Bộ câu hỏi của bạn
      </div>
      <div className="flex flex-col items-center gap-4">
        {quizzes.length > 0 ? (
          <div className="w-full flex flex-col items-center">
            <div
              className="w-full cursor-pointer group"
              onClick={handleNavigate}
            >
              <img
                src={quizzes[current].image}
                alt={quizzes[current].title}
                className="w-full h-40 sm:h-48 object-cover rounded-xl border border-neutral-200 mb-3 group-hover:brightness-95 group-hover:scale-105 transition-all duration-200"
              />
              <div className="text-center font-semibold text-lg mb-2 group-hover:text-[#D12827] transition-colors duration-200">
                {quizzes[current].title}
              </div>
            </div>
            <div className="flex gap-3 mb-3 justify-center">
              <button
                onClick={prev}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 shadow-md hover:shadow-lg transition-all duration-150"
                aria-label="Trước"
              >
                <FiChevronLeft className="w-6 h-6 text-[#D12827]" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 shadow-md hover:shadow-lg transition-all duration-150"
                aria-label="Sau"
              >
                <FiChevronRight className="w-6 h-6 text-[#D12827]" />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-10">
            <FiInbox className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-center text-gray-500 text-base font-medium">
              Bạn chưa đăng tải bộ câu hỏi nào!
            </p>
          </div>
        )}
        <button
          className="w-full bg-[#FDDAA7] hover:bg-[#FFD180] text-[#5D4037] font-bold py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-150 text-lg mt-2 hover:scale-[1.03] active:scale-100"
          onClick={() => navigate(ROUTERS.MY_QUIZ)}
        >
          Đến thư viện quiz của tôi
        </button>
      </div>
    </div>
  );
};

export default MyQuizCarousel;
