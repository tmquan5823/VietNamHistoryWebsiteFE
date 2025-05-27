import React from "react";

export const slideTypes = [
  {
    icon: "🔤",
    title: "Chọn 1 đáp án",
    desc: "Một đáp án đúng duy nhất",
    type: "single_choice",
    image: import.meta.env.VITE_BASE_URL + "/icons/answer.webp",
  },
  {
    icon: "🔤",
    title: "Chọn nhiều đáp án",
    desc: "Nhiều đáp án đúng",
    type: "multi_choice",
    image: import.meta.env.VITE_BASE_URL + "/icons/checkbox.webp",
  },
  {
    icon: "🔤",
    title: "Sắp xếp",
    desc: "Sắp xếp đáp án theo thứ tự đúng",
    type: "reorder",
    image: import.meta.env.VITE_BASE_URL + "/icons/reorder.webp",
  },
  {
    icon: "🔤",
    title: "Chọn khoảng",
    desc: "Chọn đáp án trên một thang đo",
    type: "range",
    image: import.meta.env.VITE_BASE_URL + "/icons/range.webp",
  },
  {
    icon: "🔤",
    title: "Nhập đáp án",
    desc: "Nhập đáp án đúng",
    type: "text",
    image: import.meta.env.VITE_BASE_URL + "/icons/typing.webp",
  },
  {
    icon: "🔤",
    title: "Thông tin",
    desc: "Cung cấp thông tin",
    type: "info",
    image: import.meta.env.VITE_BASE_URL + "/icons/info.webp",
  },
];

type QuizTypeProps = {
  slideTypes?: typeof slideTypes;
  onSelectType: (type: string) => void;
};

export const QuizType: React.FC<QuizTypeProps> = ({
  slideTypes: propSlideTypes,
  onSelectType,
}) => {
  const types = propSlideTypes || slideTypes;
  return (
    <div className="grid grid-cols-2 gap-6 justify-items-center items-center h-full p-10">
      {types.map((item) => (
        <div
          key={item.type}
          className="w-80 h-[110px] bg-[#fff8e1] rounded-xl flex items-center gap-6 p-5 text-[#5d4037] cursor-pointer shadow-lg border-2 border-[#c62828] transition transform hover:bg-[#fde3b0] hover:scale-105 hover:shadow-2xl"
          onClick={() => onSelectType(item.type)}
        >
          <div className="text-4xl w-[60px] h-[60px] bg-[#fde3b0] rounded-lg flex items-center justify-center">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-10 h-10 object-contain"
              />
            ) : (
              item.icon
            )}
          </div>
          <div>
            <div className="font-bold text-xl">{item.title}</div>
            <div className="text-base text-[#7b5e45] mt-1">{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
