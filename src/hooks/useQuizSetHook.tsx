import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { quizSetApi } from "../api/quizApi";
import { toast } from "sonner";
import { QuizSetWithQuestionsParams } from "@/dataHelper/quizSet.dataHelper";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "@/constant";
import { QuizQuestionCheck } from "@/dataHelper/quizQuestion.datahelper";

const quizSetQuery = (data: any) => {
  return useQuery({
    queryKey: ["quizSets", data],
    queryFn: async () => {
      try {
        const response = await quizSetApi.getQuizSets(data);
        const apiResponse = response;

        return apiResponse;
      } catch (error: any) {
        toast.error(error.response.data.message);
        throw error;
      }
    },
  });
};

const publishedQuizSetQuery = (data: any) => {
  return useQuery({
    queryKey: ["publishedQuizSets", data],
    queryFn: async () => {
      const response = await quizSetApi.getPublishedQuizSets(data);
      return response;
    },
  });
};
const createQuizSetWithQuestionsQuery = ({
  onReset,
}: {
  onReset: () => void;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: QuizSetWithQuestionsParams) => {
      const response = await quizSetApi.createQuizSetWithQuestions(data);
      return response;
    },
    onSuccess: (_, __) => {
      if (onReset) onReset();
      queryClient.invalidateQueries({ queryKey: ["quizSets"] });
      navigate(ROUTERS.MY_QUIZ);
      toast.success("Tạo bộ câu hỏi thành công");
    },
    onError: () => {
      toast.error("Lỗi");
    },
  });
};

const submitApprovalQuizSetQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await quizSetApi.submitApprovalQuizSet(id);
      return response;
    },
    onSuccess: (_, __) => {
      queryClient.invalidateQueries({ queryKey: ["quizSets"] });
      toast.success("Gửi yêu cầu public thành công");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

const unpublishQuizSetQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await quizSetApi.unpublishQuizSet(id);
      return response;
    },
    onSuccess: (_, __) => {
      queryClient.invalidateQueries({ queryKey: ["quizSets"] });
      toast.success("Hủy chia sẻ công khai thành công");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

const getQuizSetWithQuestionsQuery = (id: number) => {
  return useQuery({
    queryKey: ["quizSetWithQuestions", id],
    queryFn: async () => {
      const response = await quizSetApi.getQuizSetWithQuestions(id);
      return response;
    },
  });
};

const deleteQuizSetQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await quizSetApi.deleteQuizSet(id);
      return response;
    },
    onSuccess: (_, __) => {
      queryClient.invalidateQueries({ queryKey: ["quizSets"] });
      toast.success("Xóa bộ câu hỏi thành công");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

const updateQuizSetWithQuestionsQuery = ({
  onReset,
}: {
  onReset: () => void;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: QuizSetWithQuestionsParams) => {
      const response = await quizSetApi.updateQuizSetWithQuestions(data);
      return response;
    },
    onSuccess: (_, data) => {
      if (onReset) onReset();
      queryClient.invalidateQueries({ queryKey: ["quizSets"] });
      queryClient.invalidateQueries({ queryKey: ["quizSet", data.id] });
      navigate(ROUTERS.MY_QUIZ);
      toast.success("Cập nhật bộ câu hỏi thành công");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

const getQuizSetByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["quizSet", id],
    queryFn: async () => {
      const response = await quizSetApi.getQuizSetById(id);
      return response;
    },
  });
};

const getQuizSetWithQuestionsForPlayQuery = (id: number) => {
  return useQuery({
    queryKey: ["quizSetWithQuestionsForPlay", id],
    queryFn: async () => {
      const response = await quizSetApi.getQuizSetWithQuestionsForPlay(id);
      return response;
    },
  });
};

const submitQuizQuestionQuery = (id: number) => {
  return useMutation({
    mutationFn: async (data: QuizQuestionCheck) => {
      const response = await quizSetApi.submitQuizQuestion(id, data);
      return response;
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

const getQuizResultsQuery = (id: number) => {
  return useQuery({
    queryKey: ["quizResults", id],
    queryFn: async () => {
      const response = await quizSetApi.getQuizResults(id);
      return response;
    },
  });
};

const getQuizLeaderboardQuery = (id: number) => {
  return useQuery({
    queryKey: ["quizLeaderboard", id],
    queryFn: async () => {
      const response = await quizSetApi.getQuizLeaderboard(id);
      return response;
    },
  });
};

export const useQuizSetHook = {
  quizSetQuery,
  publishedQuizSetQuery,
  createQuizSetWithQuestionsQuery,
  submitApprovalQuizSetQuery,
  unpublishQuizSetQuery,
  deleteQuizSetQuery,
  getQuizSetWithQuestionsQuery,
  updateQuizSetWithQuestionsQuery,
  getQuizSetByIdQuery,
  getQuizSetWithQuestionsForPlayQuery,
  submitQuizQuestionQuery,
  getQuizResultsQuery,
  getQuizLeaderboardQuery,
};
