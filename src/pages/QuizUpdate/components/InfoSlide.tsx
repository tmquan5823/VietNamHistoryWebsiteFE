import React from "react";
import { QuizQuestionParams } from "@/dataHelper/quizQuestion.datahelper";

interface InfoSlideProps {
  slide: QuizQuestionParams;
  onChange: (data: Partial<QuizQuestionParams>) => void;
}

export const InfoSlide: React.FC<InfoSlideProps> = ({ slide, onChange }) => {
  return (
    <div className="mb-5">
      <div className="bg-[#19b6d2] text-white inline-block px-5 py-1 rounded-t-xl font-bold text-xl">
        Thông tin
      </div>
      <textarea
        placeholder="Nhập thông tin..."
        className="w-full min-h-[60px] rounded-b-lg rounded-tr-lg border-4 border-[#19b6d2] text-lg p-2.5 bg-[#fffbe6]"
        value={slide.info || ""}
        onChange={(e) => onChange({ info: e.target.value })}
      />
    </div>
  );
};
