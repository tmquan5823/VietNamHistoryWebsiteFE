import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './quizSlice';
import quizPlayReducer from './quizPlaySlice';
export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    quizPlay: quizPlayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
