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
      <div className="relative">
        <textarea
          placeholder="Nhập thông tin..."
          rows={10}
          className="w-full min-h-[60px] pr-20 rounded-b-lg rounded-tr-lg border-4 border-[#19b6d2] text-lg p-2.5 bg-[#fffbe6]"
          value={slide.info || ""}
          maxLength={250}
          onChange={(e) => {
            if (e.target.value.length <= 250) {
              onChange({ info: e.target.value });
            }
          }}
        />
        <div
          className="absolute top-2 right-3 flex items-center"
          style={{
            background: "#D6D3C2",
            borderRadius: "9999px",
            height: "32px",
            minWidth: "64px",
            padding: "0 8px",
            pointerEvents: "none",
          }}
        >
          <span className="text-gray-700 text-base font-bold select-none px-2">
            {250 - (slide.info || "").length}
          </span>
          <button
            type="button"
            className="text-gray-700 hover:text-red-500 text-lg font-bold focus:outline-none px-2"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              lineHeight: 1,
              cursor: "pointer",
              pointerEvents: "auto",
            }}
            onClick={() => onChange({ info: "" })}
            tabIndex={-1}
            aria-label="Xóa thông tin"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};
