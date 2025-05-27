import React, { useState, useEffect } from "react";
import { QuizQuestion } from "./QuizQuestion";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  deleteQuestion,
  updateQuestion,
} from "../../../store/quizSlice";
import { DropResult } from "@hello-pangea/dnd";
import { QuizType, slideTypes } from "./QuizType";
import { SlideList } from "./SlideList";
import { QuizQuestionParams } from "@/dataHelper/quizQuestion.datahelper";
import { QuizSetWithQuestionsParams } from "@/dataHelper/quizSet.dataHelper";
import { AnswerCheck, AnswerChecked } from "@/utils/type";
import { checkAnswer } from "@/utils/helperFunction";

type SlideFormProps = {
  slides: QuizQuestionParams[];
  setSlides: (slides: QuizQuestionParams[]) => void;
};

export const SlideForm: React.FC<SlideFormProps> = ({ slides, setSlides }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const dispatch = useDispatch();
  const [answerChecked, setAnswerChecked] = useState<AnswerChecked | undefined>(
    undefined
  );

  const questions = useSelector(
    (state: { quiz: QuizSetWithQuestionsParams }) => state.quiz.questions
  );

  useEffect(() => {
    setAnswerChecked(undefined);
  }, [activeIdx]);

  const handleAddSlide = () => {
    dispatch(addQuestion());
    setActiveIdx(slides.length);
  };

  const handleSelectType = (type: string) => {
    const number = slides[activeIdx].number;
    dispatch(updateQuestion({ number, data: { question_type: type } }));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const from = result.source.index;
    const to = result.destination.index;
    if (from === to) return;

    // Lưu lại index của slide đang active
    let newActiveIdx = activeIdx;

    const newSlides = Array.from(slides);
    const [removed] = newSlides.splice(from, 1);
    newSlides.splice(to, 0, removed);

    // Cập nhật lại number
    const updatedSlides = newSlides.map((slide, idx) => ({
      ...slide,
      number: idx + 1,
    }));

    setSlides(updatedSlides);

    if (activeIdx === from) {
      newActiveIdx = to;
    } else if (from < activeIdx && activeIdx <= to) {
      newActiveIdx = activeIdx - 1;
    } else if (to <= activeIdx && activeIdx < from) {
      newActiveIdx = activeIdx + 1;
    }
    setActiveIdx(newActiveIdx);
  };

  const handleChange = (data: Partial<QuizQuestionParams>) => {
    const number = slides[activeIdx].number;
    dispatch(updateQuestion({ number, data }));
  };

  const handleDeleteSlide = () => {
    if (slides.length <= 1) {
      dispatch(deleteQuestion(slides[activeIdx].number));
      dispatch(addQuestion());
      setActiveIdx(0);
      return;
    }
    const number = slides[activeIdx].number;
    const newSlides = slides.filter((slide) => slide.number !== number);
    const updatedSlides = newSlides.map((slide, idx) => ({
      ...slide,
      number: idx + 1,
    }));
    setSlides(updatedSlides);
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleDuplicate = () => {
    const currentSlide = slides[activeIdx];
    const newSlide = { ...currentSlide, number: 0 };
    const newSlides = [...slides];
    newSlides.splice(activeIdx + 1, 0, newSlide);
    const updatedSlides = newSlides.map((slide, idx) => ({
      ...slide,
      number: idx + 1,
    }));
    setSlides(updatedSlides);
    setActiveIdx(activeIdx + 1);
  };

  const handleCheckAnswer = (ansCheck: AnswerCheck) => {
    const { number } = ansCheck;
    const question = questions.find((q) => q.number === number);
    if (question) {
      const checkedAnswer = checkAnswer(ansCheck, question);
      console.log(checkedAnswer);
      setAnswerChecked(checkedAnswer);
    }
  };

  const handleResetAnswer = () => {
    setAnswerChecked(undefined);
  };

  const [showAnswer] = useState(false);

  // Hàm chuyển sang slide tiếp theo
  const handleNextSlide = () => {
    setActiveIdx((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  // console.log(slides[activeIdx]);

  return (
    <div className="flex-[2] bg-[#FDDAA7]/20 rounded-lg min-h-[600px] p-3 shadow flex flex-col h-full">
      {/* Danh sách slide*/}
      <SlideList
        slides={slides}
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
        handleAddSlide={handleAddSlide}
        handleDragEnd={handleDragEnd}
      />
      {/* Nội dung slide*/}
      <div className="flex-1 min-h-[400px]">
        {slides[activeIdx]?.question_type === "" ? (
          <QuizType slideTypes={slideTypes} onSelectType={handleSelectType} />
        ) : (
          <>
            {slides[activeIdx] && (
              <QuizQuestion
                slides={slides}
                slide={slides[activeIdx]}
                onChange={handleChange}
                onDeleteSlide={handleDeleteSlide}
                onDuplicateSlide={handleDuplicate}
                onCheckAnswer={handleCheckAnswer}
                onResetAnswer={handleResetAnswer}
                showAnswer={showAnswer}
                answerChecked={answerChecked}
                onNextSlide={handleNextSlide}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
