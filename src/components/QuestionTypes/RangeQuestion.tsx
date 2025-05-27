import React from "react";
import { QuizQuestionParams } from "@/dataHelper/quizQuestion.datahelper";

interface RangeQuestionFormProps {
  slide: QuizQuestionParams;
  onChange: (data: Partial<QuizQuestionParams>) => void;
}

export const RangeQuestion: React.FC<RangeQuestionFormProps> = ({
  slide,
  onChange,
}) => {
  const correctAnswers: number[] = (() => {
    try {
      if (Array.isArray(slide.correct_answers)) return slide.correct_answers;
      if (typeof slide.correct_answers === "string")
        return JSON.parse(slide.correct_answers);
      return [];
    } catch {
      return [];
    }
  })();

  return (
    <>
      {/* Question */}
      <div className="mb-5">
        <div className="bg-[#19b6d2] text-white inline-block px-5 py-1 rounded-t-xl font-bold text-xl">
          Câu hỏi
        </div>
        <textarea
          placeholder="Bắt buộc"
          className="w-full min-h-[60px] rounded-b-lg rounded-tr-lg border-4 border-[#19b6d2] text-lg p-2.5 bg-[#fffbe6]"
          value={slide.question}
          onChange={(e) => onChange({ question: e.target.value })}
        />
      </div>
      {/* Correct value */}
      <div className="mb-5">
        <div className="bg-[#1edc8b] text-white inline-block px-5 py-1 rounded-t-xl font-bold text-xl">
          Giá trị đúng
        </div>
        <input
          placeholder="Bắt buộc"
          className={`w-full rounded-b-lg rounded-tr-lg border-4 text-lg p-2.5 bg-[#fffbe6] ${(() => {
            const min = Number(slide.min_value ?? 0);
            const max = Number(slide.max_value ?? 50);
            const expected =
              Array.isArray(correctAnswers) && correctAnswers.length > 0
                ? correctAnswers[0]
                : "";
            if (
              expected !== "" &&
              (expected < min || expected > max || min >= max)
            ) {
              return "border-[#ff6790]";
            }
            return "border-[#1edc8b]";
          })()}`}
          value={
            Array.isArray(correctAnswers) && correctAnswers.length > 0
              ? correctAnswers[0]
              : ""
          }
          onChange={(e) => {
            const min = Number(slide.min_value ?? 0);
            const max = Number(slide.max_value ?? 50);
            const value = Number(e.target.value);
            let correct_answers: number[] = [];
            const checked =
              Array.isArray(correctAnswers) && correctAnswers.length === 1;
            if (checked) {
              correct_answers = [value];
            } else {
              const numSide = 5;
              correct_answers = [value];
              for (let i = 1; i <= numSide; i++) {
                if (value - i >= min) correct_answers.push(value - i);
                if (value + i <= max) correct_answers.push(value + i);
              }
            }
            onChange({ correct_answers: JSON.stringify(correct_answers) });
          }}
        />
        {(() => {
          const min = Number(slide.min_value ?? 0);
          const max = Number(slide.max_value ?? 50);
          const expected =
            Array.isArray(correctAnswers) && correctAnswers.length > 0
              ? correctAnswers[0]
              : "";
          if (
            expected !== "" &&
            (expected < min || expected > max || min >= max)
          ) {
            return (
              <div className="text-[#ff6790] text-sm mt-2 font-semibold">
                {min >= max
                  ? "Giá trị nhỏ nhất phải nhỏ hơn giá trị lớn nhất"
                  : "Giá trị đúng nằm ngoài khoảng min-max"}
              </div>
            );
          }
          return null;
        })()}
      </div>
      {/* Range */}
      <div className="mb-5">
        <div className="bg-[#34495e] text-white inline-block px-5 py-1 rounded-t-xl font-bold text-xl">
          Khoảng giá trị
        </div>
        <div className="flex gap-4 items-center bg-[#34495e] border-4 border-[#34495e] rounded-b-lg rounded-tr-lg p-4 flex-col">
          <div className="flex w-full gap-4">
            <div className="flex flex-col items-center flex-1">
              <label className="text-white mb-1">Giá trị nhỏ nhất:</label>
              <input
                type="number"
                className="w-full rounded-lg border-2 border-[#bbb] text-lg p-2.5 bg-[#fffbe6] text-center"
                value={
                  slide.min_value !== null && slide.min_value !== undefined
                    ? String(slide.min_value)
                    : ""
                }
                onChange={(e) =>
                  onChange({
                    min_value: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
            </div>
            <div className="flex flex-col items-center flex-1">
              <label className="text-white mb-1">Giá trị lớn nhất:</label>
              <input
                type="number"
                className="w-full rounded-lg border-2 border-[#bbb] text-lg p-2.5 bg-[#fffbe6] text-center"
                value={
                  slide.max_value !== null && slide.max_value !== undefined
                    ? String(slide.max_value)
                    : ""
                }
                onChange={(e) =>
                  onChange({
                    max_value: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
            </div>
          </div>
          {/* Checkbox: Yêu cầu giá trị chính xác */}
          <div className="flex items-center mt-2 self-start">
            <input
              type="checkbox"
              id="exact-only"
              className="mr-2 w-5 h-5 accent-blue-500"
              checked={
                Array.isArray(correctAnswers) && correctAnswers.length === 1
              }
              onChange={(e) => {
                const checked = e.target.checked;
                const min = Number(slide.min_value ?? 0);
                const max = Number(slide.max_value ?? 50);
                const expected =
                  Array.isArray(correctAnswers) && correctAnswers.length > 0
                    ? correctAnswers[0]
                    : min;
                let correct_answers: number[] = [];
                if (checked) {
                  correct_answers = [expected];
                } else {
                  const numSide = 5;
                  correct_answers = [expected];
                  for (let i = 1; i <= numSide; i++) {
                    if (expected - i >= min) correct_answers.push(expected - i);
                    if (expected + i <= max) correct_answers.push(expected + i);
                  }
                }
                onChange({ correct_answers: JSON.stringify(correct_answers) });
              }}
            />
            <label
              htmlFor="exact-only"
              className="text-[#7faaff] font-semibold cursor-pointer select-none"
            >
              Yêu cầu giá trị chính xác để được điểm
            </label>
          </div>
          {/* Thanh tick 50 khoảng */}
          <div className="w-full flex flex-col items-center mt-6">
            {(() => {
              const min = Number(slide.min_value ?? 0);
              const max = Number(slide.max_value ?? 50);
              if (
                !Number.isFinite(min) ||
                !Number.isFinite(max) ||
                min >= max
              ) {
                return (
                  <div className="w-full bg-[#183135] text-white text-center rounded-lg py-4 font-semibold">
                    Giá trị nhỏ nhất phải nhỏ hơn giá trị lớn nhất
                  </div>
                );
              }
              const expected =
                Array.isArray(correctAnswers) && correctAnswers.length > 0
                  ? correctAnswers[0]
                  : "";
              let ticks: number[] = [];
              if (max > min && max - min + 1 <= 50) {
                ticks = Array.from(
                  { length: max - min + 1 },
                  (_, i) => min + i
                );
              } else {
                const tickCount = 51;
                let step = Math.max(
                  1,
                  Math.round((max - min) / (tickCount - 1))
                );
                ticks = Array.from({ length: tickCount }, (_, i) =>
                  Math.round(min + i * step)
                );
                ticks = Array.from(new Set(ticks));
                if (
                  typeof expected === "number" &&
                  !isNaN(expected) &&
                  !ticks.includes(expected)
                ) {
                  ticks.push(expected);
                  ticks = Array.from(new Set(ticks)).sort((a, b) => a - b);
                }
              }
              // Lấy các tick xanh từ correct_answers
              const correctSet = new Set(correctAnswers);
              return (
                <div className="w-full flex items-end gap-[2px] h-16">
                  {ticks.map((tick, idx) => {
                    const isExact = Math.round(tick) === expected;
                    const isCorrect = correctSet.has(Math.round(tick));
                    return (
                      <div
                        key={idx}
                        className={`flex-1 rounded-full cursor-pointer ${
                          isExact
                            ? "bg-green-600"
                            : isCorrect
                            ? "bg-green-400"
                            : "bg-gray-300"
                        }`}
                        style={{
                          height: isExact ? 48 : isCorrect ? 32 : 16,
                          transition: "height 0.2s",
                        }}
                        title={String(Math.round(tick))}
                        onClick={() => {
                          // Khi chọn tick, cập nhật correct_answers
                          let correct_answers: number[] = [];
                          const checked =
                            Array.isArray(correctAnswers) &&
                            correctAnswers.length === 1;
                          const min = Number(slide.min_value ?? 0);
                          const max = Number(slide.max_value ?? 50);
                          if (checked) {
                            correct_answers = [Math.round(tick)];
                          } else {
                            const numSide = 5;
                            correct_answers = [Math.round(tick)];
                            for (let i = 1; i <= numSide; i++) {
                              if (Math.round(tick) - i >= min)
                                correct_answers.push(Math.round(tick) - i);
                              if (Math.round(tick) + i <= max)
                                correct_answers.push(Math.round(tick) + i);
                            }
                          }
                          onChange({
                            correct_answers: JSON.stringify(correct_answers),
                          });
                        }}
                      />
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
      {/* Fun fact */}
      <div className="mb-2">
        <div className="bg-[#183135] text-white inline-block px-5 py-1 rounded-t-xl font-bold text-xl">
          Sự thật thú vị
        </div>
        <textarea
          placeholder="Tùy chọn"
          className="w-full rounded-b-lg rounded-tr-lg border-4 border-[#183135] text-lg p-2.5 bg-[#fffbe6]"
          value={slide.funfact}
          rows={3}
          onChange={(e) => onChange({ funfact: e.target.value })}
        />
      </div>
    </>
  );
};
