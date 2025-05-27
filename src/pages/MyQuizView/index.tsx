import React from "react";
import { useParams } from "react-router-dom";
import BackButton from "@/components/ui/backButton";
import PageContainer from "@/components/common/PageContainer";
import { useQuizSetHook } from "@/hooks/useQuizSetHook";
import QuizSetView from "@/components/common/QuizSetView";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz, resetQuiz } from "@/store/quizPlaySlice";
import Modal from "@/components/Layout/modal";
import { RootState } from "@/store";
import QuizQuestionPlay from "@/components/common/QuizQuestionPlay";
import { AnswerChecked } from "@/utils/type";
import { QuizQuestionCheck } from "@/dataHelper/quizQuestion.datahelper";

const MyQuizDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: quizSet, isLoading: isLoading } =
    useQuizSetHook.getQuizSetByIdQuery(Number(id));
  const { refetch: refetchQuizSetForPlay } =
    useQuizSetHook.getQuizSetWithQuestionsForPlayQuery(Number(id));
  const quizPlay = useSelector((state: RootState) => state.quizPlay);
  const [showModal, setShowModal] = React.useState(false);
  const [currentSlideIdx, setCurrentSlideIdx] = React.useState(0);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [checkedAnswer, setCheckedAnswer] = React.useState<AnswerChecked>();
  const [answerResults, setAnswerResults] = React.useState<{
    [questionNumber: number]: AnswerChecked;
  }>({});

  // Khởi tạo mutation cho submit quiz question
  const submitQuizQuestionMutation = useQuizSetHook.submitQuizQuestionQuery(
    Number(id)
  );

  const handlePlay = async () => {
    setCurrentSlideIdx(0);
    setCheckedAnswer(undefined);
    setAnswerResults({});
    setShowConfirm(false);

    // Reset redux quizPlay trước khi fetch mới
    dispatch(resetQuiz());

    setShowModal(true);
    const result = await refetchQuizSetForPlay();
    if (result.data) {
      dispatch(setQuiz(result.data.data));
      setShowConfirm(true);
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIdx < quizPlay.questions.length - 1) {
      setCurrentSlideIdx((prev) => prev + 1);
      setCheckedAnswer(undefined);
    } else if (currentSlideIdx === quizPlay.questions.length - 1) {
      // Đã hết câu hỏi, chuyển sang slide kết quả
      setCurrentSlideIdx(quizPlay.questions.length);
      setCheckedAnswer(undefined);
    }
  };

  // Hàm submit đáp án cho câu hỏi hiện tại
  const handleSubmitQuizQuestion = async (userAnswer: QuizQuestionCheck) => {
    const question = quizPlay.questions[currentSlideIdx];
    const payload: QuizQuestionCheck = {
      number: question.number,
      answer: userAnswer.answer,
      score: userAnswer.score,
    };
    if (userAnswer.time_taken !== undefined)
      payload.time_taken = userAnswer.time_taken;
    if (userAnswer.is_multi_answer !== undefined)
      payload.is_multi_answer = userAnswer.is_multi_answer;
    if (userAnswer.is_end_time !== undefined)
      payload.is_end_time = userAnswer.is_end_time;
    const result = await submitQuizQuestionMutation.mutateAsync(payload);
    setCheckedAnswer(result.data);
    // Lưu kết quả vào answerResults
    setAnswerResults((prev) => ({ ...prev, [question.number]: result.data }));
  };

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (!quizSet)
    return (
      <div className="text-center py-10 text-red-500">
        Không tìm thấy bộ câu hỏi
      </div>
    );

  return (
    <PageContainer title="" info="">
      <div className="w-full max-w-5xl mx-auto">
        <BackButton className="mb-4" />
        <QuizSetView quizSetData={quizSet.data} onPlay={handlePlay} />
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          {quizPlay.questions.length > 0 && (
            <QuizQuestionPlay
              question={
                currentSlideIdx < quizPlay.questions.length
                  ? quizPlay.questions[currentSlideIdx]
                  : undefined
              }
              slides={quizPlay.questions}
              onClose={() => setShowModal(false)}
              checkAnswer={handleSubmitQuizQuestion}
              answerChecked={checkedAnswer}
              onNextSlide={
                showConfirm
                  ? () => {
                      setCurrentSlideIdx(0);
                      setTimeout(() => setShowConfirm(false), 0);
                    }
                  : handleNextSlide
              }
              startSlide={showConfirm}
              onContinue={
                currentSlideIdx > 0 ? () => setShowConfirm(false) : undefined
              }
              onRestart={
                currentSlideIdx > 0
                  ? () => {
                      setCurrentSlideIdx(0);
                      setTimeout(() => setShowConfirm(false), 0);
                    }
                  : undefined
              }
              canContinue={currentSlideIdx > 0}
              answerResults={answerResults}
            />
          )}
        </Modal>
      </div>
    </PageContainer>
  );
};

export default MyQuizDetail;
