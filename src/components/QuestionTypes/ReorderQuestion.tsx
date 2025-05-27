import React from "react";
import { QuizQuestionParams } from "@/dataHelper/quizQuestion.datahelper";

interface ReorderQuestionFormProps {
  slide: QuizQuestionParams;
  onChange: (data: Partial<QuizQuestionParams>) => void;
}

export const ReorderQuestion: React.FC<ReorderQuestionFormProps> = ({
  slide,
  onChange,
}) => {
  let correct: string[] = [];
  try {
    correct = JSON.parse(slide.correct_answers || "[]");
  } catch {
    correct = [];
  }

  // Xử lý thay đổi item đúng thứ tự
  const handleCorrectChange = (idx: number, value: string) => {
    let newCorrect = [...correct];
    // Đảm bảo các ô phía trên đều có giá trị (ít nhất là rỗng)
    for (let i = 0; i <= idx; i++) {
      if (typeof newCorrect[i] === "undefined") newCorrect[i] = "";
    }
    newCorrect[idx] = value;
    onChange({ correct_answers: JSON.stringify(newCorrect) });
  };

  return (
    <>
      {/* Question */}
      <div className="mb-5">
        <div className="bg-[#19b6d2] text-white inline-block px-5 py-1 rounded-t-xl font-bold text-xl">
          Câu hỏi
        </div>
        <div className="relative">
          <textarea
            placeholder="Bắt buộc"
            className="w-full min-h-[60px] pr-20 rounded-b-lg rounded-tr-lg border-4 border-[#19b6d2] text-lg p-2.5 bg-[#fffbe6]"
            value={slide.question}
            maxLength={120}
            onChange={(e) => {
              if (e.target.value.length <= 120) {
                onChange({ question: e.target.value });
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
              {120 - (slide.question?.length || 0)}
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
              onClick={() => onChange({ question: "" })}
              tabIndex={-1}
              aria-label="Xóa câu hỏi"
            >
              ×
            </button>
          </div>
        </div>
      </div>
      {/* Correct order */}
      <div className="mb-5">
        <div className="bg-[#16a085] text-white inline-block px-5 py-1 rounded-t-xl font-bold text-xl">
          Các mục theo thứ tự đúng
        </div>
        <div className="border-4 border-[#16a085] rounded-b-lg rounded-tr-lg bg-[#16a085]">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <span className="w-8 text-white font-bold text-lg text-center">
                {idx + 1}.
              </span>
              <div className="relative w-full">
                <input
                  placeholder={idx < 2 ? "Bắt buộc" : "Tùy chọn"}
                  className="w-full pr-20 rounded-lg border-2 border-[#16a085] text-lg p-2.5 bg-[#fffbe6] mb-2"
                  value={correct[idx] || ""}
                  maxLength={75}
                  onChange={(e) => {
                    if (e.target.value.length <= 75) {
                      handleCorrectChange(idx, e.target.value);
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
                    {75 - (correct[idx] || "").length}
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
                    onClick={() => handleCorrectChange(idx, "")}
                    tabIndex={-1}
                    aria-label={`Xóa mục ${idx + 1}`}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Fun fact */}
      <div className="mb-2">
        <div className="bg-[#183135] text-white inline-block px-5 py-1 rounded-t-xl font-bold text-xl">
          Sự thật thú vị
        </div>
        <div className="relative">
          <textarea
            placeholder="Tùy chọn"
            className="w-full pr-20 rounded-b-lg rounded-tr-lg border-4 border-[#183135] text-lg p-2.5 bg-[#fffbe6]"
            value={slide.funfact}
            maxLength={150}
            rows={3}
            onChange={(e) => {
              if (e.target.value.length <= 150) {
                onChange({ funfact: e.target.value });
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
              {150 - (slide.funfact?.length || 0)}
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
              onClick={() => onChange({ funfact: "" })}
              tabIndex={-1}
              aria-label="Xóa funfact"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
