import { ResponseData } from "@/utils/type"
import axiosClient from "./axiosClient"
import { QuizSet, QuizSetParams, QuizSetWithQuestionsParams, QuizSetWithQuestions, QuizSetResponse, QuizSetForPlay, QuizSetForPlayResponse, QuizResults, QuizLeaderboardEntry } from "@/dataHelper/quizSet.dataHelper"
import { QuizQuestionCheck, QuizQuestionChecked } from "@/dataHelper/quizQuestion.datahelper"

export const quizSetApi = {
    getQuizSets: (data: QuizSetParams): Promise<ResponseData<QuizSetResponse>> =>
        axiosClient.get("/quiz-sets/getByToken", { params: data }),
    getPublishedQuizSets: (data: QuizSetParams): Promise<ResponseData<QuizSetForPlayResponse>> =>
        axiosClient.get("/quiz-sets/published", { params: data }),
    getQuizSetById: (id: number): Promise<ResponseData<QuizSet>> =>
        axiosClient.get(`/quiz-sets/${id}`),
    createQuizSet: (data: QuizSetParams): Promise<ResponseData<QuizSet>> =>
        axiosClient.post("/quiz-sets/create", data),
    getQuizSetWithQuestions: (id: number): Promise<ResponseData<QuizSetWithQuestions>> =>
        axiosClient.get(`/quiz-sets/quizSetWithQuestions/${id}`),
    updateQuizSetWithQuestions: (data: QuizSetWithQuestionsParams): Promise<ResponseData<QuizSetWithQuestions>> =>
        axiosClient.put(`/quiz-sets/quizSetWithQuestions`, data),
    createQuizSetWithQuestions: (data: QuizSetWithQuestionsParams): Promise<ResponseData<QuizSetWithQuestions>> =>
        axiosClient.post("/quiz-sets/quizSetWithQuestions", data),
    submitApprovalQuizSet: (id: number): Promise<ResponseData<QuizSet>> =>
        axiosClient.put(`/quiz-sets/${id}/submit-approval`),
    unpublishQuizSet: (id: number): Promise<ResponseData<QuizSet>> =>
        axiosClient.put(`/quiz-sets/${id}/unpublish`),
    deleteQuizSet: (id: number): Promise<ResponseData<null>> =>
        axiosClient.delete(`/quiz-sets/${id}`),
    getQuizSetWithQuestionsForPlay: (id: number): Promise<ResponseData<QuizSetForPlay>> =>
        axiosClient.get(`/quiz-sets/quizSetWithQuestionsForPlay/${id}`),
    submitQuizQuestion: (id: number, data: QuizQuestionCheck): Promise<ResponseData<QuizQuestionChecked>> =>
        axiosClient.post(`/quiz-sets/${id}/questions/submit`, data),
    getQuizResults: (id: number): Promise<ResponseData<QuizResults>> =>
        axiosClient.get(`/quiz-sets/${id}/results`),
    getQuizLeaderboard: (id: number): Promise<ResponseData<QuizLeaderboardEntry[]>> =>
        axiosClient.get(`/quiz-sets/${id}/leaderboard`),
}