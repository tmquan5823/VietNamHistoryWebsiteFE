import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizSetWithQuestionsParams } from '@/dataHelper/quizSet.dataHelper';
import { QuizQuestionParams } from '@/dataHelper/quizQuestion.datahelper';
import { RootState } from "@/store"; // adjust path if needed

const initialState: QuizSetWithQuestionsParams = {
  id: undefined,
  title: "",
  description: "",
  topic_ids: [],
  image: "",
  status: "unpublish",
  questions: [
    {
      question: "",
      question_type: "",
      image_url: "",
      correct_answers: "[]",
      options: "[]",
      min_value: 0,
      max_value: 50,
      time_limit_seconds: 30,
      max_score: 1000,
      number: 1,
      action: "",
      info: "",
      funfact: "",
    },
  ],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizSet(state, action: PayloadAction<Partial<Omit<QuizSetWithQuestionsParams, 'questions'>>>) {
      Object.assign(state, action.payload);
    },
    setQuestions(state, action: PayloadAction<QuizQuestionParams[]>) {
      state.questions = action.payload;
    },
    updateQuestion(state, action: PayloadAction<{ number: number; data: Partial<QuizQuestionParams> }>) {
      const { number, data } = action.payload;
      const idx = state.questions.findIndex(q => q.number === number);
      if (idx !== -1) {
        state.questions[idx] = { ...state.questions[idx], ...data } as QuizQuestionParams;
      }
    },
    deleteQuestion(state, action: PayloadAction<number>) {
      const number = action.payload;
      const idx = state.questions.findIndex(q => q.number === number);
      if (idx !== -1) {
        state.questions.splice(idx, 1);
      }
    },
    addQuestion(state) {
      state.questions.push({
        question: "",
        question_type: "",
        image_url: "",
        correct_answers: "[]",
        options: "[]",
        action: "created",
        min_value: 0,
        max_value: 50,
        time_limit_seconds: 30,
        max_score: 1000,
        number: state.questions.length + 1,
        info: "",
        funfact: "",
      });
    },
    resetQuiz: () => initialState,
  },
});

export const { setQuizSet, setQuestions, updateQuestion, addQuestion, deleteQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;

export const selectQuestionByNumber = (state: RootState, number: number) =>
state.quiz.questions.find((q: QuizQuestionParams) => q.number === number);