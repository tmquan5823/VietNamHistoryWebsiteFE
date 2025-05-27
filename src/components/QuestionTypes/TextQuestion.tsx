import React from "react";
import { QuizQuestionParams } from "@/dataHelper/quizQuestion.datahelper";

interface TextQuestionFormProps {
  slide: QuizQuestionParams;
  onChange: (data: Partial<QuizQuestionParams>) => void;
}

export const TextQuestion: React.FC<TextQuestionFormProps> = ({
  slide,
  onChange,
}) => {
  let correct: string[] = [];
  try {
    correct = JSON.parse(slide.correct_answers || "[]") || [];
  } catch {
    correct = [];
  }
  if (correct.length === 0) correct = [""];

  const handleCorrectChange = (idx: number, value: string) => {
    const newCorrect = [...correct];
    newCorrect[idx] = value;
    onChange({ correct_answers: JSON.stringify(newCorrect) });
  };

  const handleAddCorrect = () => {
    onChange({ correct_answers: JSON.stringify([...correct, ""]) });
  };

  const handleRemoveCorrect = (idx: number) => {
    const newCorrect = correct.filter((_, i) => i !== idx);
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
            className="w-full min-h-[60px] rounded-b-lg rounded-tr-lg border-4 border-[#19b6d2] text-lg p-2.5 pr-20 bg-[#fffbe6]"
            value={slide.question}
            onChange={(e) => onChange({ question: e.target.value })}
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
              onClick={() => {
                onChange({ question: "" });
              }}
              tabIndex={-1}
              aria-label="Xóa câu hỏi"
            >
              ×
            </button>
          </div>
        </div>
      </div>
      {/* Correct answers */}
      <div className="mb-5">
        <div className="bg-[#16a085] text-white inline-block px-5 py-1 rounded-t-xl font-bold text-xl">
          Đáp án
        </div>
        <div className="border-4 border-[#16a085] rounded-b-lg rounded-tr-lg bg-[#16a085] p-4">
          {correct.map((ans, idx) => (
            <div key={idx} className="flex items-center mb-2 gap-2">
              <div className="relative w-full">
                <input
                  placeholder="Bắt buộc"
                  className="w-full pr-20 rounded-lg border-2 border-[#16a085] text-lg p-2.5 bg-[#fffbe6]"
                  value={ans}
                  onChange={(e) => handleCorrectChange(idx, e.target.value)}
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
                    {75 - (ans?.length || 0)}
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
                    aria-label={`Xóa đáp án ${idx + 1}`}
                  >
                    ×
                  </button>
                </div>
              </div>
              {correct.length > 1 && (
                <button
                  type="button"
                  className={`flex items-center justify-center w-8 h-8 ml-1 rounded-full transition hover:bg-red-200 focus:outline-none ${
                    idx === 0 ? "invisible" : ""
                  }`}
                  style={{
                    color: "#e53935",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                  }}
                  onClick={() => idx !== 0 && handleRemoveCorrect(idx)}
                  tabIndex={idx === 0 ? -1 : 0}
                  aria-label="Xóa đáp án"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 6L14 14M14 6L6 14"
                      stroke="#e53935"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-white font-semibold underline mt-2 hover:text-[#e0f7fa]"
            onClick={handleAddCorrect}
          >
            Thêm đáp án khác
          </button>
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
            className="w-full rounded-b-lg pr-20 rounded-tr-lg border-4 border-[#183135] text-lg p-2.5 bg-[#fffbe6]"
            value={slide.funfact}
            rows={3}
            onChange={(e) => onChange({ funfact: e.target.value })}
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
