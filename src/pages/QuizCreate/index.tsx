import React, { useEffect, useRef } from "react";
import { QuizSetForm } from "./components/QuizSetForm";
import { SlideForm } from "./components/SlideForm";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { setQuestions, resetQuiz, setQuizSet } from "../../store/quizSlice";
import { useTopicHook } from "@/hooks/useTopicHook";
import { useQuizSetHook } from "@/hooks/useQuizSetHook";
import { QuizQuestionParams } from "@/dataHelper/quizQuestion.datahelper";
import { getQuizDraft, setQuizDraft, removeQuizDraft } from "@/utils/storage";
import { QuizSetWithQuestionsParams } from "@/dataHelper/quizSet.dataHelper";
import { toast } from "sonner";
import { areAllSlidesValid } from "@/utils/helperFunction";

export const QuizCreate: React.FC = () => {
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const dispatch = useDispatch();

  const handleSetQuestions = (questions: QuizQuestionParams[]) =>
    dispatch(setQuestions(questions));
  const { data: topics } = useTopicHook.topicQuery();

  const quiz = useSelector((state: RootState) => state.quiz);

  const { mutate: createQuizSetWithQuestions } =
    useQuizSetHook.createQuizSetWithQuestionsQuery({
      onReset: () => {
        dispatch(resetQuiz());
        removeQuizDraft();
      },
    });

  const handleCreateQuizSetWithQuestions = (
    quiz: QuizSetWithQuestionsParams
  ) => {
    const isvalid = areAllSlidesValid(quiz.questions);
    if (!isvalid) {
      toast.error("Vui lòng kiểm tra lại các câu hỏi");
      return;
    }
    createQuizSetWithQuestions(quiz);
  };

  // Cờ để bỏ qua lần chạy đầu tiên
  const isFirstRender = useRef(true);

  // Khi mount, chỉ nạp draft nếu có
  useEffect(() => {
    const quizDraft = getQuizDraft();
    if (quizDraft) {
      dispatch(setQuizSet(quizDraft));
    }
  }, [dispatch]);

  // Chỉ lưu vào localStorage khi state quiz thay đổi, và KHÔNG phải lần đầu tiên (tức là sau khi đã nạp draft)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setQuizDraft(quiz);
  }, [quiz]);

  return (
    <div className="flex h-[100%] w-full min-h-screen overflow-x-hidden">
      <div className="w-[360px] flex-shrink-0">
        <QuizSetForm
          topics={topics ?? []}
          createQuizSetWithQuestions={handleCreateQuizSetWithQuestions}
          quiz={quiz}
        />
      </div>
      <div className="flex-1 min-w-0">
        <SlideForm slides={questions} setSlides={handleSetQuestions} />
      </div>
    </div>
  );
};
