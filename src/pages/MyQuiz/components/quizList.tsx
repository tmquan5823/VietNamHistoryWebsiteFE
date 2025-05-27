import React from "react";
import QuizItem from "./QuizItem";
import { QuizSet } from "@/dataHelper/quizSet.dataHelper";

interface QuizListProps {
  quizzes: QuizSet[];
  onPublishQuiz: (id: number) => void;
  onUnpublishQuiz: (id: number) => void;
  onDeleteQuizSet: (id: number) => void;
}

const QuizList: React.FC<QuizListProps> = ({
  quizzes,
  onPublishQuiz,
  onUnpublishQuiz,
  onDeleteQuizSet,
}) => {
  return (
    <div className="grid gap-4">
      {quizzes &&
        quizzes.map((quiz) => (
          <QuizItem
            key={quiz.id}
            quiz={quiz}
            onPublishQuiz={onPublishQuiz}
            onUnpublishQuiz={onUnpublishQuiz}
            onDeleteQuizSet={onDeleteQuizSet}
          />
        ))}
    </div>
  );
};

export default QuizList;
