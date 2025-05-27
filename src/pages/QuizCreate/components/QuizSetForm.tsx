import React, { useRef, useEffect } from "react";
import BackButton from "@/components/ui/backButton";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Topic } from "@/dataHelper/topic.dataHelper";
import { useDispatch } from "react-redux";
import { setQuizSet } from "../../../store/quizSlice";
import ReactSelect from "react-select";
import { QuizSetWithQuestionsParams } from "@/dataHelper/quizSet.dataHelper";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizSetSchema } from "@/utils/schema";
import { useImageHook } from "@/hooks/useImageHook";
export const QuizSetForm: React.FC<{
  topics: Topic[];
  createQuizSetWithQuestions: (quiz: QuizSetWithQuestionsParams) => void;
  quiz: QuizSetWithQuestionsParams;
}> = ({ topics, createQuizSetWithQuestions, quiz }) => {
  const methods = useForm({
    resolver: zodResolver(quizSetSchema()),
    defaultValues: {
      title: quiz.title,
      description: quiz.description,
      topic_ids: quiz.topic_ids.length > 0 ? quiz.topic_ids : [],
      thumbnail: quiz.image,
      isPublic: quiz.status === "pending",
    },
  });
  const { mutateAsync: uploadImage } = useImageHook.uploadImage();
  const { mutateAsync: deleteImage } = useImageHook.deleteImage();

  const { reset } = methods;

  useEffect(() => {
    reset({
      title: quiz.title,
      description: quiz.description,
      topic_ids: quiz.topic_ids.length > 0 ? quiz.topic_ids : [],
      thumbnail: quiz.image,
      isPublic: quiz.status === "pending",
    });
  }, [quiz, reset]);

  const [thumbnail, setThumbnail] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  // Hàm xử lý upload thumbnail
  const handleUploadThumbnail = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    setIsUploading(true);
    try {
      const res: any = await uploadImage(formData);
      if (res && res.success) {
        setThumbnail(res.url);
        dispatch(
          setQuizSet({ image: res.url, image_public_id: res.public_id })
        );
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    setIsDeleting(true);
    try {
      if (quiz.image_public_id) {
        await deleteImage(quiz.image_public_id);
        dispatch(setQuizSet({ image: undefined, image_public_id: undefined }));
        setThumbnail(null);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex-1 max-w-[400px] bg-white p-6 rounded-lg shadow-md h-full">
      <BackButton className="mb-3" />
      <h2 className="text-2xl font-bold mb-6 text-[#5D4037]">Tạo bộ câu hỏi</h2>
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(() => {
            createQuizSetWithQuestions(quiz);
          })}
        >
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-[#5d4037]">
                  Tiêu đề
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="mb-1"
                    style={{ marginTop: 0 }}
                    onChange={(e) => {
                      field.onChange(e);
                      dispatch(setQuizSet({ title: e.target.value }));
                    }}
                  />
                </FormControl>
                {methods.formState.errors.title && (
                  <span className="text-red-500 text-xs">
                    {methods.formState.errors.title.message as string}
                  </span>
                )}
              </FormItem>
            )}
          />
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel className="font-semibold text-[#5d4037]">
                  Mô tả
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="mb-1"
                    style={{ marginTop: 0 }}
                    onChange={(e) => {
                      field.onChange(e);
                      dispatch(setQuizSet({ description: e.target.value }));
                    }}
                  />
                </FormControl>
                {methods.formState.errors.description && (
                  <span className="text-red-500 text-xs">
                    {methods.formState.errors.description.message as string}
                  </span>
                )}
              </FormItem>
            )}
          />
          <div className="mb-6">
            <label className="font-semibold block text-[#5d4037] mt-2">
              Hình ảnh
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#d32f2f] hover:bg-[#c62828] text-white rounded-md px-4 py-2 font-semibold text-base mb-0"
              disabled={isUploading || isDeleting}
            >
              {isUploading
                ? "Đang tải..."
                : isDeleting
                ? "Đang tải..."
                : "Chọn ảnh"}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  if (quiz.image || thumbnail) {
                    await handleDeleteImage();
                  }
                  await handleUploadThumbnail(e.target.files[0]);
                }
              }}
            />
            {isUploading && (
              <div className="flex justify-center items-center mt-3 w-full aspect-square max-w-[200px] max-h-[200px]">
                <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {isDeleting && (
              <div className="flex justify-center items-center mt-3 w-full aspect-square max-w-[200px] max-h-[200px]">
                <div className="w-12 h-12 border-4 border-red-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {!isUploading && !isDeleting && (thumbnail || quiz.image) && (
              <div className="mt-3 rounded-xl overflow-hidden border-2 border-gray-200 shadow w-full aspect-square max-w-[200px] max-h-[200px] flex justify-center items-center bg-gray-50 relative">
                <img
                  src={thumbnail || quiz.image}
                  alt="thumbnail"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}
          </div>
          <FormField
            name="topic_ids"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-[#5d4037]">
                  Chủ đề
                </FormLabel>
                <FormControl>
                  <ReactSelect
                    isMulti
                    options={topics.map((topic) => ({
                      value: topic.id,
                      label: topic.name,
                    }))}
                    value={topics
                      .filter((topic) => field.value.includes(topic.id))
                      .map((topic) => ({
                        value: topic.id,
                        label: topic.name,
                      }))}
                    onChange={(selected) => {
                      const ids = (selected as any[]).map((item) => item.value);
                      dispatch(setQuizSet({ topic_ids: ids }));
                      field.onChange(ids);
                    }}
                  />
                </FormControl>
                {methods.formState.errors.topic_ids && (
                  <span className="text-red-500 text-xs">
                    {methods.formState.errors.topic_ids.message as string}
                  </span>
                )}
              </FormItem>
            )}
          />
          {/* Checkbox chia sẻ công khai */}
          <FormField
            name="isPublic"
            render={({ field }) => (
              <div className="flex items-center mt-4 mb-2">
                <input
                  type="checkbox"
                  id="public-share"
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    dispatch(
                      setQuizSet({
                        status: e.target.checked ? "pending" : "unpublish",
                      })
                    );
                  }}
                  className="mr-2"
                />
                <label
                  htmlFor="public-share"
                  className="font-semibold text-[#5d4037] cursor-pointer"
                >
                  Chia sẻ công khai
                </label>
                {methods.formState.errors.isPublic && (
                  <span className="text-red-500 text-xs ml-2">
                    {methods.formState.errors.isPublic.message as string}
                  </span>
                )}
              </div>
            )}
          />
          <Button
            type="submit"
            className="mt-6 w-full bg-[#5D4037] hover:bg-[#5D4037] text-white font-bold"
          >
            Tạo bộ câu hỏi
          </Button>
        </form>
      </Form>
    </div>
  );
};
