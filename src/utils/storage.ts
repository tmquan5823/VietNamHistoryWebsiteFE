import { STORAGE_VAR } from "../constant";

export const getAccessToken = () => {
  return localStorage.getItem(STORAGE_VAR.ACCESS_TOKEN);
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(STORAGE_VAR.ACCESS_TOKEN, token);
};

export const removeAccessToken = () => {
  localStorage.removeItem(STORAGE_VAR.ACCESS_TOKEN);
};

// Quiz draft
const QUIZ_DRAFT_KEY = "quizDraft";

export const getQuizDraft = () => {
  const data = localStorage.getItem(QUIZ_DRAFT_KEY);
  return data ? JSON.parse(data) : null;
};

export const setQuizDraft = (quiz: any) => {
  localStorage.setItem(QUIZ_DRAFT_KEY, JSON.stringify(quiz));
};

export const removeQuizDraft = () => {
  localStorage.removeItem(QUIZ_DRAFT_KEY);
};

// Quiz edit draft (for update) - mỗi quiz một key riêng biệt
const getQuizEditDraftKey = (id: string | number) => `quizEditDraft_${id}`;

export const getQuizEditDraft = (id: string | number) => {
  const data = localStorage.getItem(getQuizEditDraftKey(id));
  return data ? JSON.parse(data) : null;
};

export const setQuizEditDraft = (id: string | number, quiz: any) => {
  localStorage.setItem(getQuizEditDraftKey(id), JSON.stringify(quiz));
};

export const removeQuizEditDraft = (id: string | number) => {
  localStorage.removeItem(getQuizEditDraftKey(id));
};

// Lưu kết quả chơi bộ quiz hiện tại theo userId và quizId
const getCurrentQuizResultsKey = (userId: string | number, quizId: string | number) => `currentQuizResults_${userId}_${quizId}`;

export const setCurrentQuizResults = (userId: string | number, quizId: string | number, results: any) => {
  localStorage.setItem(getCurrentQuizResultsKey(userId, quizId), JSON.stringify(results));
};

export const getCurrentQuizResults = (userId: string | number, quizId: string | number) => {
  const data = localStorage.getItem(getCurrentQuizResultsKey(userId, quizId));
  return data ? JSON.parse(data) : null;
};

export const removeCurrentQuizResults = (userId: string | number, quizId: string | number) => {
  localStorage.removeItem(getCurrentQuizResultsKey(userId, quizId));
};


// Forum post draft
const FORUM_POST_DRAFT_KEY = "forumPostDraft";

export const getForumPostDraft = () => {
  const data = localStorage.getItem(FORUM_POST_DRAFT_KEY);
  return data ? JSON.parse(data) : null;
};

export const setForumPostDraft = (forumPost: any) => {
  localStorage.setItem(FORUM_POST_DRAFT_KEY, JSON.stringify(forumPost));
};

export const removeForumPostDraft = () => {
  localStorage.removeItem(FORUM_POST_DRAFT_KEY);
};

