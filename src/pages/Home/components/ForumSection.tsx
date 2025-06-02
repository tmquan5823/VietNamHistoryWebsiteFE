import React from "react";
import SectionContainer from "../../../components/common/SectionContainer";
import { Post } from "@/dataHelper/dashboard.dataHelper";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "@/constant";

interface ForumSectionProps {
  data: Post[];
  usersCount: number;
}

const ForumSection: React.FC<ForumSectionProps> = ({ data, usersCount }) => {
  const forumData = Array.isArray(data) ? data : [];
  const navigate = useNavigate();
  return (
    <SectionContainer
      title="Diễn đàn lịch sử"
      subtitle="Tham gia thảo luận, trao đổi và chia sẻ kiến thức lịch sử với cộng đồng"
      className="bg-[#FDDAA7]/30"
    >
      <div className="bg-[#5D4137] rounded-xl overflow-hidden border border-[#5D4137]">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white">
            Thảo luận nổi bật
          </h3>
        </div>

        <div className="bg-white">
          {forumData.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Không có bài viết nào.
            </div>
          ) : (
            forumData.map((item) => (
              <div key={item.id} className="border-b border-[#5D4137]/30 p-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0">
                    <img
                      src={item.creator?.avatar || "/default-avatar.png"}
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <div className="flex-grow">
                    <h4
                      onClick={() => {
                        navigate(
                          ROUTERS.FORUM_DETAIL.replace(
                            ":id",
                            item.id.toString()
                          )
                        );
                      }}
                      className="text-[#5D4137] font-semibold mb-2 hover:text-[#D12827] cursor-pointer"
                    >
                      {item.title}
                    </h4>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>
                        Bởi{" "}
                        <span className="text-[#D12827]">
                          {item.creator?.fullname || "Ẩn danh"}
                        </span>
                      </span>
                      <span>•</span>
                      <span>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("vi-VN")
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Join Discussion Button */}
        <div className="bg-white border-t border-gray-100 p-4 flex justify-between items-center flex-wrap">
          <p className="text-gray-600">
            Tham gia thảo luận cùng {usersCount} thành viên
          </p>
          <button
            className="px-7 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition w-full sm:w-auto"
            style={{ minWidth: 160 }}
            onClick={() => {
              navigate(ROUTERS.FORUM);
            }}
          >
            Tham gia
          </button>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ForumSection;
