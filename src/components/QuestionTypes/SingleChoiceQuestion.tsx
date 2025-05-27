import React from "react";
import { QuizQuestionParams } from "@/dataHelper/quizQuestion.datahelper";

interface SingleChoiceQuestionFormProps {
  slide: QuizQuestionParams;
  onChange: (data: Partial<QuizQuestionParams>) => void;
}

export const SingleChoiceQuestion: React.FC<SingleChoiceQuestionFormProps> = ({
  slide,
  onChange,
}) => {
  let options: string[] = [];
  let correct: string = "";
  try {
    options = JSON.parse(slide.options || "[]");
    correct = JSON.parse(slide.correct_answers || "[]")[0] || "";
  } catch {
    options = [];
    correct = "";
  }

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
            className="w-full min-h-[60px] pr-20 rounded-b-lg rounded-tr-lg border-4 border-[#19b6d2] text-lg p-2.5 bg-[#fffbe6] break-words whitespace-pre-line"
            value={slide.question}
            onChange={(e) => {
              if (e.target.value.length <= 120) {
                onChange({ question: e.target.value });
              }
            }}
            maxLength={120}
            style={{ wordBreak: "break-word", resize: "vertical" }}
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
      {/* Correct answer */}
      <div className="mb-5">
        <div className="bg-[#1edc8b] text-white inline-block px-5 py-1 rounded-t-xl font-bold text-xl">
          Đáp án đúng
        </div>
        <div className="relative">
          <input
            placeholder="Bắt buộc"
            className="w-full rounded-b-lg rounded-tr-lg  border-4 border-[#1edc8b] text-lg p-2.5 pr-20 bg-[#fffbe6]"
            value={correct}
            onChange={(e) => {
              const newCorrect = e.target.value;
              // Loại bỏ đáp án đúng cũ và đáp án đúng mới khỏi options, thêm đáp án đúng mới vào đầu
              let newOptions = options.filter(
                (opt) => opt !== correct && opt !== newCorrect
              );
              if (newCorrect) newOptions = [newCorrect, ...newOptions];
              onChange({
                correct_answers: JSON.stringify([newCorrect]),
                options: JSON.stringify(newOptions),
              });
            }}
            maxLength={75}
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
              {75 - (correct?.length || 0)}
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
                // Reset đáp án đúng về rỗng
                let newOptions = options.filter((opt) => opt !== correct);
                onChange({
                  correct_answers: JSON.stringify([""]),
                  options: JSON.stringify(newOptions),
                });
              }}
              tabIndex={-1}
              aria-label="Xóa đáp án đúng"
            >
              ×
            </button>
          </div>
        </div>
      </div>
      {/* False answers */}
      <div className="mb-5">
        <div className="bg-[#e85b7c] text-white inline-block px-5 py-1 rounded-t-xl font-bold text-xl">
          Câu trả lời sai
        </div>
        <div className="border-4 border-[#e85b7c] rounded-b-lg rounded-tr-lg bg-[#e85b7c]">
          {Array.from({ length: 3 }).map((_, idx) => {
            const falseAnswers = options.filter((opt) => opt !== correct);
            const value = falseAnswers[idx] || "";
            return (
              <div className="relative">
                <input
                  key={idx}
                  placeholder={idx === 0 ? "Bắt buộc" : "Tùy chọn"}
                  className="w-full rounded-lg border-2 border-[#e85b7c] text-lg p-2.5 pr-20 bg-[#fffbe6] mb-2"
                  value={value}
                  onChange={(e) => {
                    const falseAnswersNew = [...falseAnswers];
                    falseAnswersNew[idx] = e.target.value;
                    // Loại bỏ các giá trị rỗng và trùng correct
                    const filtered = falseAnswersNew.filter(
                      (ans) => ans && ans !== correct
                    );
                    onChange({
                      options: JSON.stringify([correct, ...filtered]),
                    });
                  }}
                  maxLength={75}
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
                    onClick={() => {
                      // Reset đáp án sai này về rỗng
                      const falseAnswersNew = [...falseAnswers];
                      falseAnswersNew[idx] = "";
                      const filtered = falseAnswersNew.filter(
                        (ans) => ans && ans !== correct
                      );
                      onChange({
                        options: JSON.stringify([correct, ...filtered]),
                      });
                    }}
                    tabIndex={-1}
                    aria-label={`Xóa đáp án sai ${idx + 1}`}
                  >
                    ×
                  </button>
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
              onClick={() => {
                onChange({ funfact: "" });
              }}
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
