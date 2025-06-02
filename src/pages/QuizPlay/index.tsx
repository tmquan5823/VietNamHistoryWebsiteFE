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
import {
  setCurrentQuizResults,
  removeCurrentQuizResults,
  getCurrentQuizResults,
} from "@/utils/storage";
import { useUserStore } from "@/store/useUserStore";
import { QuizResults } from "@/dataHelper/quizSet.dataHelper";
import QuizLeaderboard from "@/components/common/QuizLeaderboard";
import Loading from "@/components/common/Loading";

const QuizPlay: React.FC = () => {
  const { id } = useParams();
  const { user } = useUserStore();
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
  const [quizResults, setQuizResults] = React.useState<QuizResults>();
  const { data: fetchedQuizResults, refetch: refetchQuizResults } =
    useQuizSetHook.getQuizResultsQuery(Number(id));
  const submitQuizQuestionMutation = useQuizSetHook.submitQuizQuestionQuery(
    Number(id)
  );
  const {
    data: leaderboardData,
    isLoading: isLoadingLeaderboard,
    refetch: refetchLeaderboard,
  } = useQuizSetHook.getQuizLeaderboardQuery(Number(id));
  React.useEffect(() => {
    if (id && user && showModal) {
      const saved = getCurrentQuizResults(user.id, id);
      if (saved && saved.answerResults) {
        setAnswerResults(saved.answerResults);
        if (typeof saved.currentSlideIdx === "number") {
          setCurrentSlideIdx(saved.currentSlideIdx);
        }
      }
    }
  }, [id, user, showModal]);

  React.useEffect(() => {
    if (fetchedQuizResults) {
      setQuizResults(fetchedQuizResults.data);
    }
  }, [fetchedQuizResults]);

  React.useEffect(() => {
    if (
      currentSlideIdx === quizPlay.questions.length &&
      quizPlay.questions.length > 0
    ) {
      refetchLeaderboard();
      refetchQuizResults();
    }
  }, [
    currentSlideIdx,
    quizPlay.questions.length,
    refetchLeaderboard,
    refetchQuizResults,
  ]);

  const handlePlay = async () => {
    setCurrentSlideIdx(0);
    setCheckedAnswer(undefined);
    setAnswerResults({});
    setShowConfirm(false);

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
      setCurrentSlideIdx(quizPlay.questions.length);
      setCheckedAnswer(undefined);
      if (id && user) removeCurrentQuizResults(user.id, id);
    }
  };

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
    setAnswerResults((prev) => {
      const newResults = { ...prev, [question.number]: result.data };
      if (id && user)
        setCurrentQuizResults(user.id, id, {
          answerResults: newResults,
          currentSlideIdx,
        });
      return newResults;
    });
  };

  if (isLoading) return <Loading fullscreen />;
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
              quizResults={quizResults}
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
              leaderBoardLoading={isLoadingLeaderboard}
              startSlide={showConfirm}
              onContinue={
                answerResults && Object.keys(answerResults).length > 0
                  ? () => {
                      const saved =
                        id && user ? getCurrentQuizResults(user.id, id) : null;
                      if (saved && saved.answerResults) {
                        setAnswerResults(saved.answerResults);
                        let idx =
                          typeof saved.currentSlideIdx === "number"
                            ? saved.currentSlideIdx
                            : 0;
                        const answeredNumbers = Object.keys(
                          saved.answerResults
                        ).map(Number);
                        if (
                          quizPlay.questions &&
                          quizPlay.questions[idx] &&
                          answeredNumbers.includes(
                            quizPlay.questions[idx].number
                          )
                        ) {
                          if (idx < quizPlay.questions.length - 1) idx += 1;
                        }
                        setCurrentSlideIdx(idx);
                        setShowConfirm(false);
                      }
                    }
                  : undefined
              }
              onRestart={
                currentSlideIdx > 0 ||
                (answerResults && Object.keys(answerResults).length > 0)
                  ? () => {
                      setCurrentSlideIdx(0);
                      setAnswerResults({});
                      setTimeout(() => setShowConfirm(false), 0);
                      if (id && user) removeCurrentQuizResults(user.id, id);
                    }
                  : undefined
              }
              canContinue={
                answerResults && Object.keys(answerResults).length > 0
              }
              answerResults={answerResults}
            />
          )}
        </Modal>
        {leaderboardData?.data && (
          <QuizLeaderboard leaderboard={leaderboardData.data} />
        )}
      </div>
    </PageContainer>
  );
};

export default QuizPlay;
