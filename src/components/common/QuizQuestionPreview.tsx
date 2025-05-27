import React from "react";
import { QuizQuestionParams } from "@/dataHelper/quizQuestion.datahelper";
import SingleChoiceQuestion from "@/components/QuestionTypesAnswer/SingleChoiceQuestion";
import MultiChoiceQuestion from "../QuestionTypesAnswer/MultiChoiceQuestion";
import TextQuestion from "../QuestionTypesAnswer/TextQuestion";
import { AnswerCheck, AnswerChecked } from "@/utils/type";
import InfoSlide from "../QuestionTypesAnswer/InfoSlide";

interface QuizQuestionProps {
  question: QuizQuestionParams;
  showAnswer?: boolean;
  onClose?: () => void;
  checkAnswer?: (ansCheck: AnswerCheck) => void;
  answerChecked?: AnswerChecked;
  onResetAnswer?: () => void;
  onNextSlide?: () => void;
  slides: QuizQuestionParams[];
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  showAnswer = false,
  onClose,
  answerChecked,
  onResetAnswer,
  checkAnswer,
  slides,
  onNextSlide,
}) => {
  // Render theo loại câu hỏi
  if (question.question_type === "single_choice") {
    return (
      <SingleChoiceQuestion
        question={question}
        slides={slides}
        showAnswer={showAnswer}
        answerChecked={answerChecked}
        checkAnswer={checkAnswer}
        onResetAnswer={onResetAnswer}
        onClose={onClose}
        onNextSlide={onNextSlide}
        fullscreen={false}
        handleFullscreen={() => {}}
      />
    );
  }
  if (question.question_type === "multi_choice") {
    return (
      <MultiChoiceQuestion
        question={question}
        slides={slides}
        showAnswer={showAnswer}
        checkAnswer={checkAnswer}
        answerChecked={answerChecked}
        onResetAnswer={onResetAnswer}
        onClose={onClose}
        onNextSlide={onNextSlide}
        fullscreen={false}
        handleFullscreen={() => {}}
      />
    );
  }
  if (question.question_type === "text") {
    return (
      <TextQuestion
        question={question}
        slides={slides}
        showAnswer={showAnswer}
        checkAnswer={checkAnswer}
        answerChecked={answerChecked}
        onResetAnswer={onResetAnswer}
        onClose={onClose}
        onNextSlide={onNextSlide}
      />
    );
  }
  if (question.question_type === "info") {
    return <InfoSlide question={question} onClose={onClose} slides={slides} />;
  }

  // TODO: Thêm các loại câu hỏi khác ở đây

  // Mặc định: render như cũ (hoặc có thể trả về null)
  return (
    <div className="w-full flex items-center justify-center text-white">
      <div>Chưa hỗ trợ loại câu hỏi này: {question.question_type}</div>
    </div>
  );
};

export default QuizQuestion;
