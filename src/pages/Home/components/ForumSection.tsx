import React from "react";
import SectionContainer from "../../../components/common/SectionContainer";
import { Button } from "@/components/ui/button";

const forumData = [
  {
    title:
      "Phân tích chiến thuật quân sự của Trần Hưng Đạo trong trận Bạch Đằng",
    description:
      "Thảo luận về các chiến thuật quân sự và tài năng chỉ huy xuất chúng của Trần Hưng Đạo trong chiến thắng Bạch Đằng năm 1288.",
    author: "Trần Minh Quân",
    views: "100 <3",
    comments: "10 bình luận",
    date: "13/4/2025",
    tags: [
      { name: "Thời Trần", color: "bg-red-50 text-red-600" },
      { name: "Học thuật", color: "bg-orange-50 text-orange-600" },
    ],
    avatar: import.meta.env.VITE_BASE_URL + "images/default-avatar.png",
  },
  {
    title:
      "Phân tích chiến thuật quân sự của Trần Hưng Đạo trong trận Bạch Đằng: Một bước ngoặt trong lịch sử quân sự Việt Nam",
    description:
      "Trần Hưng Đạo không chỉ là một vị tướng tài ba mà còn là một chiến lược gia xuất sắc. Trong trận Bạch Đằng năm 1288, ông đã vận dụng một cách hoàn hảo các chiến thuật quân sự, dẫn dắt quân dân Đại Việt giành chiến thắng vang dội trước quân xâm lược Nguyên Mông. Bài viết này sẽ phân tích chi tiết các chiến thuật độc đáo mà Trần Hưng Đạo áp dụng trong trận đánh lịch sử này, từ việc lợi dụng địa hình đến việc sử dụng chiến thuật giáp công và đánh úp.",
    author: "Trần Minh Quân",
    views: "100 <3",
    comments: "10 bình luận",
    date: "13/4/2025",
    tags: [
      { name: "Thời Trần", color: "bg-red-50 text-red-600" },
      { name: "Học thuật", color: "bg-orange-50 text-orange-600" },
    ],
    avatar: import.meta.env.VITE_BASE_URL + "images/default-avatar.png",
  },
  {
    title:
      "Phân tích chiến thuật quân sự của Trần Hưng Đạo trong trận Bạch Đằng",
    description:
      "Thảo luận về các chiến thuật quân sự và tài năng chỉ huy xuất chúng của Trần Hưng Đạo trong chiến thắng Bạch Đằng năm 1288.",
    author: "Trần Minh Quân",
    views: "100 <3",
    comments: "10 bình luận",
    date: "13/4/2025",
    tags: [
      { name: "Thời Trần", color: "bg-red-50 text-red-600" },
      { name: "Học thuật", color: "bg-orange-50 text-orange-600" },
    ],
    avatar: import.meta.env.VITE_BASE_URL + "images/default-avatar.png",
  },
];

const ForumSection: React.FC = () => {
  return (
    <SectionContainer
      title="Diễn đàn lịch sử"
      subtitle="Tham gia thảo luận, trao đổi và chia sẻ kiến thức lịch sử với cộng đồng"
      className="bg-[#FDDAA7]/30"
    >
      {/* Forum Container */}
      <div className="bg-[#5D4137] rounded-xl overflow-hidden border border-[#5D4137]">
        {/* Header */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white">
            Thảo luận nổi bật
          </h3>
        </div>

        {/* Discussion List */}
        <div className="bg-white">
          {forumData.map((item, index) => (
            <div key={index} className="border-b border-[#5D4137]/30 p-4">
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0">
                  <img
                    src={item.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  {/* Tags */}
                  <div className="flex gap-2 mb-2">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${tag.color}`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h4 className="text-[#5D4137] font-semibold mb-2 hover:text-[#D12827] cursor-pointer">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-3">
                    {item.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>
                      Bởi <span className="text-[#D12827]">{item.author}</span>
                    </span>
                    <span>•</span>
                    <span>{item.comments}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Discussion Button */}
        <div className="bg-white border-t border-gray-100 p-4 flex justify-between items-center flex-wrap">
          <p className="text-gray-600">
            Tham gia thảo luận cùng 12,000 thành viên
          </p>
          <Button size="lg" className="font-semibold" onClick={() => {}}>
            Tham gia
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ForumSection;
