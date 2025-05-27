import React, { useRef, useState, useEffect } from "react";
import { SingleChoiceQuestion } from "../../../components/QuestionTypes/SingleChoiceQuestion";
import { MultipleChoiceQuestion } from "../../../components/QuestionTypes/MultipleChoiceQuestion";
import { slideTypes } from "./QuizType";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { InfoSlide } from "../../../components/QuestionTypes/InfoSlide";
import { ReorderQuestion } from "../../../components/QuestionTypes/ReorderQuestion";
import { TextQuestion } from "../../../components/QuestionTypes/TextQuestion";
import { RangeQuestion } from "../../../components/QuestionTypes/RangeQuestion";
import { QuizQuestionParams } from "@/dataHelper/quizQuestion.datahelper";
import Modal from "@/components/Layout/modal";
import QuizQuestionPreview from "@/components/common/QuizQuestionPreview";
import { isSlideValid } from "@/utils/helperFunction";
import { AnswerChecked, AnswerCheck } from "@/utils/type";
import { useImageHook } from "@/hooks/useImageHook";
import { MdDelete } from "react-icons/md";

interface QuizQuestionProps {
  slide: QuizQuestionParams;
  slides: QuizQuestionParams[];
  onChange: (data: Partial<QuizQuestionParams>) => void;
  onDeleteSlide?: () => void;
  onDuplicateSlide?: () => void;
  onCheckAnswer?: (ansCheck: AnswerCheck) => void;
  showAnswer?: boolean;
  answerChecked?: AnswerChecked;
  onResetAnswer?: () => void;
  onNextSlide?: () => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  slide,
  slides,
  onChange,
  onDeleteSlide,
  onDuplicateSlide,
  onCheckAnswer,
  showAnswer,
  answerChecked,
  onResetAnswer,
  onNextSlide,
}) => {
  // Quản lý ảnh local nếu cần (nếu slide.image_url là base64 hoặc url)
  const [image, setImage] = useState<string | null>(slide.image_url || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imagePublicId, setImagePublicId] = useState<string | undefined>(
    slide.image_public_id
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { mutateAsync: uploadImage } = useImageHook.uploadImage();
  const { mutateAsync: deleteImage } = useImageHook.deleteImage();
  // Đồng bộ lại image khi chuyển slide hoặc slide.image_url thay đổi
  useEffect(() => {
    setImage(slide.image_url || null);
    setImagePublicId(slide.image_public_id);
  }, [slide.image_url, slide.image_public_id]);

  // Xử lý upload ảnh giống QuizSetForm
  const handleUploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    setIsUploading(true);
    try {
      const res: any = await uploadImage(formData);
      if (res && res.success) {
        setImage(res.url);
        setImagePublicId(res.public_id);
        onChange({ image_url: res.url, image_public_id: res.public_id });
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Xử lý xóa ảnh giống QuizSetForm
  const handleDeleteImage = async (resetInput = true) => {
    setIsDeleting(true);
    try {
      if (imagePublicId) {
        await deleteImage(imagePublicId);
        setImage(null);
        setImagePublicId(undefined);
        onChange({ image_url: undefined, image_public_id: undefined });
        if (resetInput && fileInputRef.current) fileInputRef.current.value = "";
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Khi chọn file mới, xóa ảnh cũ trước nếu có
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (imagePublicId) {
        // Không reset input khi thay ảnh
        await handleDeleteImage(false);
      }
      await handleUploadImage(e.target.files[0]);
    }
  };

  const options = [
    { value: 5, label: "Thời gian siêu ngắn (5s)" },
    { value: 10, label: "Thời gian ngắn (10s)" },
    { value: 20, label: "Thời gian bình thường (20s)" },
    { value: 30, label: "Thời gian dài (30s)" },
    { value: 45, label: "Thời gian siêu dài (45s)" },
    { value: 60, label: "Thời gian siêu siêu dài (60s)" },
  ];

  return (
    <div className="flex gap-6 w-full min-h-[500px] mt-6">
      <div className="flex-1 bg-white rounded-2xl min-h-[300px] flex flex-col items-center">
        {/* Thêm hình ảnh hoặc hiển thị ảnh */}
        <div className="w-full flex flex-col items-center mb-8">
          {!image ? (
            <>
              <div className="w-full h-[270px] bg-[#264653]/70 rounded-2xl flex items-center justify-center">
                <button
                  className="bg-[#264653] text-[#fff] border-none rounded-xl px-5 py-2.5 font-bold text-lg cursor-pointer shadow-md min-w-[120px] max-w-[160px] w-full block"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || isDeleting}
                >
                  {isUploading
                    ? "Đang tải..."
                    : isDeleting
                    ? "Đang xóa..."
                    : "Thêm hình ảnh"}
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
                disabled={isUploading || isDeleting}
              />
            </>
          ) : (
            <div className="w-full min-h-[500px] bg-[#6d5a7c] rounded-2xl flex flex-col items-center justify-start overflow-hidden p-6 relative">
              {/* Thanh nút trên ảnh */}
              <div className="flex justify-between w-full px-4">
                <div className="flex gap-2">
                  <button
                    title="Xóa ảnh"
                    onClick={async (e) => {
                      e.preventDefault();
                      await handleDeleteImage();
                    }}
                    className="bg-transparent border-none cursor-pointer text-white text-2xl p-2"
                    disabled={isUploading || isDeleting}
                  >
                    <MdDelete size={30} className="text-[#white]" />
                  </button>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-transparent border-none text-white font-bold text-lg cursor-pointer p-2"
                  disabled={isUploading || isDeleting}
                >
                  Thay ảnh
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isUploading || isDeleting}
                />
              </div>
              {(isUploading || isDeleting) && (
                <div className="flex justify-center items-center w-full h-full absolute top-0 left-0 bg-black/30 z-10">
                  <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <div className="flex-1 w-full h-full flex items-center justify-center">
                <img
                  src={image || slide.image_url || undefined}
                  alt="preview"
                  className="w-[480px] h-[360px] object-contain rounded-xl bg-[#eee] mx-auto"
                />
              </div>
            </div>
          )}
        </div>
        {/* Select thời gian giới hạn và loại câu hỏi */}
        <div className="w-full flex flex-col gap-3 mb-4 px-4">
          <div className="flex items-center gap-3 w-full">
            {/* Bỏ label Thời gian giới hạn */}
            <Listbox
              value={options.find((o) => o.value === slide.time_limit_seconds)}
              onChange={(value: { value: number; label: string } | undefined) =>
                onChange({ time_limit_seconds: value?.value })
              }
            >
              <div className="relative w-full">
                <Listbox.Button className="w-full bg-[#FDDAA7]/60 text-[#183135] rounded-lg px-4 py-3 text-left flex justify-between items-center">
                  Thời gian:{" "}
                  {
                    options.find((o) => o.value === slide.time_limit_seconds)
                      ?.label
                  }
                  <ChevronDownIcon className="w-5 h-5 ml-2" />
                </Listbox.Button>
                <Listbox.Options
                  className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10 max-h-36 overflow-auto scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option}
                      className={({ active }: { active: boolean }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                          active ? "bg-[#19b6d2] text-white" : "text-black"
                        }`
                      }
                    >
                      {option.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
          <div className="flex items-center gap-3 w-full">
            {/* Bỏ label Loại câu hỏi */}
            <Listbox
              value={slideTypes.find((t) => t.type === slide.question_type)}
              onChange={(type: (typeof slideTypes)[0] | undefined) =>
                onChange({ question_type: type?.type })
              }
            >
              <div className="relative w-full">
                <Listbox.Button className="w-full bg-[#FDDAA7]/60 text-[#183135]  rounded-lg px-4 py-3 text-left flex justify-between items-center">
                  Loại câu hỏi:{" "}
                  {
                    slideTypes.find((t) => t.type === slide.question_type)
                      ?.title
                  }
                  <ChevronDownIcon className="w-5 h-5 ml-2" />
                </Listbox.Button>
                <Listbox.Options
                  className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10 max-h-36 overflow-auto scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {slideTypes.map((type) => (
                    <Listbox.Option
                      key={type.type}
                      value={type}
                      className={({ active }: { active: boolean }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                          active ? "bg-[#19b6d2] text-white" : "text-black"
                        }`
                      }
                    >
                      {type.title}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </div>
        {/* Ba nút dưới */}
        <div className="w-full bg-white rounded-2xl py-8 px-0 flex flex-col items-center gap-4">
          <button
            className="bg-[#5D4037] text-white border-none rounded-xl px-5 py-2.5 font-bold text-lg cursor-pointer shadow-md w-60 text-center disabled:bg-gray-400 disabled:text-gray-200 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={() => setPreviewOpen(true)}
            disabled={!isSlideValid(slide)}
          >
            Xem trước
          </button>
          <button
            className="bg-[#19b6d2] text-white border-none rounded-xl px-5 py-2.5 font-bold text-lg cursor-pointer shadow-md w-60 text-center"
            onClick={onDuplicateSlide}
          >
            Nhân đôi slide
          </button>
          <button
            className="bg-[#e85b7c] text-white border-none rounded-xl px-5 py-2.5 font-bold text-lg cursor-pointer shadow-md w-60 text-center"
            onClick={onDeleteSlide}
          >
            Xóa slide
          </button>
        </div>
        <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
          <QuizQuestionPreview
            question={{
              ...slide,
              image_url: image || slide.image_url || "",
            }}
            slides={slides}
            showAnswer={showAnswer}
            checkAnswer={onCheckAnswer}
            answerChecked={answerChecked}
            onResetAnswer={onResetAnswer}
            onClose={() => setPreviewOpen(false)}
            onNextSlide={onNextSlide}
          />
        </Modal>
      </div>
      {/* Right: Question form */}
      <div className="flex-[1.5] bg-[#25626a] rounded-2xl p-6 flex flex-col gap-4">
        {/* Question form theo loại câu hỏi */}
        {(() => {
          if (slide.question_type === "single_choice") {
            return <SingleChoiceQuestion slide={slide} onChange={onChange} />;
          } else if (slide.question_type === "multi_choice") {
            return <MultipleChoiceQuestion slide={slide} onChange={onChange} />;
          } else if (slide.question_type === "info") {
            return <InfoSlide slide={slide} onChange={onChange} />;
          } else if (slide.question_type === "reorder") {
            return <ReorderQuestion slide={slide} onChange={onChange} />;
          } else if (slide.question_type === "text") {
            return <TextQuestion slide={slide} onChange={onChange} />;
          } else if (slide.question_type === "range") {
            return <RangeQuestion slide={slide} onChange={onChange} />;
          } else {
            return (
              <div className="text-white text-xl">
                Chưa hỗ trợ loại câu hỏi này
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
};

/* Thêm vào cuối file hoặc import global css:
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
*/
