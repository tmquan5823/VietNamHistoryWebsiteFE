// Hàm xử lý hiển thị năm
export function formatYear(year: number) {
    return year < 0 ? `${Math.abs(year)} TCN` : year;
  }

// Hàm kiểm tra slide (quiz) có hợp lệ không
import type { QuizQuestionParams } from "@/dataHelper/quizQuestion.datahelper";
export function isSlideValid(slide: QuizQuestionParams): boolean {
  if (!slide.question_type) return false;

  try {
    switch (slide.question_type) {
      case "single_choice": {
        if (!slide.question) return false;
        const options = JSON.parse(slide.options || '[]');
        const correct = JSON.parse(slide.correct_answers || '[]');
        if (!Array.isArray(options) || options.filter((opt: string) => !!opt).length < 2) return false;
        if (!Array.isArray(correct) || correct.length !== 1) return false;
        if (!options.includes(correct[0])) return false;
        return true;
      }
      case "multi_choice": {
        if (!slide.question) return false;
        const options = JSON.parse(slide.options || '[]');
        const correct = JSON.parse(slide.correct_answers || '[]');
        if (!Array.isArray(options) || options.filter((opt: string) => !!opt).length < 1) return false;
        if (!Array.isArray(correct) || correct.length < 1) return false;
        if (!correct.every((c: string) => options.includes(c))) return false;
        return true;
      }
      case "reorder": {
        if (!slide.question) return false;
        const correct = JSON.parse(slide.correct_answers || '[]');
        if (!Array.isArray(correct) || correct.filter((c: string) => !!c).length < 2) return false;
        return true;
      }
      case "info": {
        if (!slide.info || typeof slide.info !== "string" || !slide.info.trim()) return false;
        return true;
      }
      case "text": {
        if (!slide.question) return false;
        const correct = JSON.parse(slide.correct_answers || '[]');
        if (!Array.isArray(correct) || correct.length < 1) return false;
        if (!correct.every((c: string) => typeof c === "string" && c.trim() !== "")) return false;
        return true;
      }
      case "range": {
        if (!slide.question) return false;
        const min = Number(slide.min_value);
        const max = Number(slide.max_value);
        if (!Number.isFinite(min) || !Number.isFinite(max) || min >= max) return false;
        let correct: number[] = [];
        try {
          correct = JSON.parse(slide.correct_answers || '[]');
        } catch {
          return false;
        }
        if (!Array.isArray(correct) || correct.length < 1) return false;
        if (!correct.every((c) => typeof c === "number" && c >= min && c <= max)) return false;
        return true;
      }
      default:
        return false;
    }
  } catch {
    return false;
  }
}

// Hàm kiểm tra đáp án và trả về kết quả
import { AnswerCheck, AnswerChecked } from "./type";

export function checkAnswer(
  ansCheck: AnswerCheck,
  question: QuizQuestionParams
): AnswerChecked {
  const { answer, score, is_multi_answer, is_end_time } = ansCheck;

  // Parse correct_answers (dạng chuỗi JSON)
  let correctArr: string[] = [];
  try {
    correctArr = JSON.parse(question.correct_answers || '[]');
  } catch {
    correctArr = [];
  }

  // So sánh: single choice (1 đáp án) hoặc multi choice (nhiều đáp án)
  let isCorrect = false;
  if (question.question_type === "text") {
    if (answer.length === 1) {
      const userAns = answer[0].trim().toLowerCase();
      isCorrect = correctArr.some(
        (c) => c.trim().toLowerCase() === userAns
      );
    }
  } else if (correctArr.length === 1) {
    isCorrect = answer.length === 1 && answer[0] === correctArr[0];
  } else {
    const sortA = [...answer].sort();
    const sortB = [...correctArr].sort();
    isCorrect =
      sortA.length === sortB.length &&
      sortA.every((val, idx) => val === sortB[idx]);
  }

  // Nếu là multi_answer và (đáp án đúng hoặc hết thời gian) thì mới hiện đáp án đúng và funfact
  const shouldShowAnswer = !is_multi_answer || isCorrect || is_end_time;

  return {
    is_correct: isCorrect,
    correct_answer: shouldShowAnswer ? correctArr : [],
    score: isCorrect ? score : 0,
    funfact: shouldShowAnswer ? (question.funfact || "") : "",
  };
}

// Kiểm tra tất cả slides đều hợp lệ
export function areAllSlidesValid(slides: QuizQuestionParams[]): boolean {
  return slides.every(isSlideValid);
}

