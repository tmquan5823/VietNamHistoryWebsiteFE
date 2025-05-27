import React, { useEffect, useRef } from "react";
import { QuizSetForm } from "./components/QuizSetForm";
import { SlideForm } from "./components/SlideForm";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { setQuestions, resetQuiz, setQuizSet } from "../../store/quizSlice";
import { useTopicHook } from "@/hooks/useTopicHook";
import { useQuizSetHook } from "@/hooks/useQuizSetHook";
import { QuizQuestionParams } from "@/dataHelper/quizQuestion.datahelper";
import {
  getQuizEditDraft,
  setQuizEditDraft,
  removeQuizEditDraft,
} from "@/utils/storage";
import { useParams } from "react-router-dom";
import { areAllSlidesValid } from "@/utils/helperFunction";
import { toast } from "sonner";
import { QuizSetWithQuestionsParams } from "@/dataHelper/quizSet.dataHelper";

export const QuizUpdate: React.FC = () => {
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleSetQuestions = (questions: QuizQuestionParams[]) =>
    dispatch(setQuestions(questions));
  const { data: topics } = useTopicHook.topicQuery();

  const quiz = useSelector((state: RootState) => state.quiz);
  const { data: quizSetWithQuestions } =
    useQuizSetHook.getQuizSetWithQuestionsQuery(Number(id));

  const { mutate: updateQuizSetWithQuestions } =
    useQuizSetHook.updateQuizSetWithQuestionsQuery({
      onReset: () => {
        dispatch(resetQuiz());
        if (id) removeQuizEditDraft(id);
      },
    });

  const handleUpdateQuizSetWithQuestions = (
    quiz: QuizSetWithQuestionsParams
  ) => {
    const isvalid = areAllSlidesValid(quiz.questions);
    if (!isvalid) {
      toast.error("Vui lòng kiểm tra lại các câu hỏi");
      return;
    }
    updateQuizSetWithQuestions(quiz);
  };
  // Cờ để bỏ qua lần chạy đầu tiên
  const isFirstRender = useRef(true);

  // Khi mount, chỉ nạp draft nếu có
  useEffect(() => {
    if (!id) return;
    const quizDraft = getQuizEditDraft(id);
    const remoteQuizSet = quizSetWithQuestions?.data;
    const shouldUseRemote =
      !quizDraft ||
      !quizDraft.updatedAt ||
      (remoteQuizSet?.updatedAt &&
        quizDraft.updatedAt < remoteQuizSet.updatedAt);

    if (!shouldUseRemote) {
      dispatch(setQuizSet(quizDraft));
    } else if (remoteQuizSet && quizSetWithQuestions.data) {
      const quizSet = quizSetWithQuestions.data;
      dispatch(
        setQuizSet({
          id: quizSet.id,
          image: quizSet.image,
          title: quizSet.title,
          description: quizSet.description,
          topic_ids: quizSet.topic_ids ?? [],
          status: quizSet.status as "unpublish" | "publish" | "pending",
          updatedAt: quizSet.updatedAt,
        })
      );
      dispatch(setQuestions(quizSet.questions));
    }
  }, [dispatch, quizSetWithQuestions, id]);
  // Chỉ lưu vào localStorage khi state quiz thay đổi, và KHÔNG phải lần đầu tiên (tức là sau khi đã nạp draft)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (id) setQuizEditDraft(id, quiz);
  }, [quiz, id]);

  return (
    <div className="flex h-[100%] w-full min-h-screen overflow-x-hidden">
      <div className="w-[360px] flex-shrink-0">
        <QuizSetForm
          topics={topics ?? []}
          updateQuizSetWithQuestions={handleUpdateQuizSetWithQuestions}
          quiz={quiz}
        />
      </div>
      <div className="flex-1 min-w-0">
        <SlideForm slides={questions} setSlides={handleSetQuestions} />
      </div>
    </div>
  );
};
