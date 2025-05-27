import React from "react";
import { QuizQuestionParams } from "@/dataHelper/quizQuestion.datahelper";

interface MultipleChoiceQuestionFormProps {
  slide: QuizQuestionParams;
  onChange: (data: Partial<QuizQuestionParams>) => void;
}

export const MultipleChoiceQuestion: React.FC<
  MultipleChoiceQuestionFormProps
> = ({ slide, onChange }) => {
  let options: string[] = [];
  let correct: string[] = [];
  try {
    options = JSON.parse(slide.options || "[]");
    correct = JSON.parse(slide.correct_answers || "[]") || [];
  } catch {
    options = [];
    correct = [];
  }

  // Nếu chưa có đáp án đúng nào và đáp án đầu tiên có giá trị, tự động chọn đáp án đầu tiên là đúng
  React.useEffect(() => {
    if (correct.length === 0 && options[0]) {
      onChange({ correct_answers: JSON.stringify([options[0]]) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options[0]]);

  // Xử lý chọn đáp án đúng
  const handleToggleCorrect = (opt: string) => {
    let newCorrect: string[];
    if (correct.includes(opt)) {
      newCorrect = correct.filter((c) => c !== opt);
    } else {
      newCorrect = [...correct, opt];
    }
    onChange({ correct_answers: JSON.stringify(newCorrect) });
  };

  // Xử lý thay đổi đáp án
  const handleOptionChange = (idx: number, value: string) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    // Nếu đáp án đúng bị xóa thì loại khỏi correct
    const newCorrect = correct.filter((c) => newOptions.includes(c));
    onChange({
      options: JSON.stringify(newOptions),
      correct_answers: JSON.stringify(newCorrect),
    });
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
      {/* Select the correct answer(s) */}
      <div className="mb-5">
        <div className="bg-[#19444a] text-white inline-block px-5 py-1 rounded-t-xl font-bold text-xl">
          Chọn đáp án đúng
        </div>
        <div className="border-4 border-[#19444a] rounded-b-lg rounded-tr-lg bg-[#19444a]">
          {Array.from({ length: 4 }).map((_, idx) => {
            const value = options[idx] || "";
            const isCorrect = value && correct.includes(value);
            return (
              <div key={idx} className="flex items-center mb-2">
                <button
                  type="button"
                  className={`w-12 h-12 rounded-l-lg flex items-center justify-center text-2xl font-bold border-2 transition-all
                  ${
                    isCorrect && value
                      ? "bg-[#1edc8b] text-white border-[#1edc8b]"
                      : "bg-[#e85b7c] text-white border-[#e85b7c]"
                  }
                  ${!value ? "opacity-60 cursor-not-allowed" : ""}
                `}
                  onClick={() => value && handleToggleCorrect(value)}
                  tabIndex={-1}
                  disabled={!value}
                >
                  <img
                    src={
                      isCorrect
                        ? import.meta.env.VITE_BASE_URL + "/icons/check.webp"
                        : import.meta.env.VITE_BASE_URL + "/icons/cancel.webp"
                    }
                    alt={isCorrect ? "Đúng" : "Sai"}
                    className="w-6 h-6"
                  />
                </button>
                <div className="relative w-full h-12">
                  <input
                    placeholder={idx === 0 ? "Bắt buộc" : "Tùy chọn"}
                    className="w-full h-12 pr-20 rounded-r-lg border-2 border-[#e85b7c] text-lg px-2.5 bg-[#fffbe6] focus:border-[#19b6d2]"
                    value={value}
                    maxLength={75}
                    onChange={(e) => {
                      if (e.target.value.length <= 75) {
                        handleOptionChange(idx, e.target.value);
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
                    }}
                  >
                    <span className="text-gray-700 text-base font-bold select-none px-2">
                      {75 - (value?.length || 0)}
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
                      }}
                      onClick={() => handleOptionChange(idx, "")}
                      tabIndex={-1}
                      aria-label={`Xóa đáp án ${idx + 1}`}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
