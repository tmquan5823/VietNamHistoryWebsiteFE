import React, { useRef, useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useNotification } from "@/hooks/useNotification";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pagination from "@/components/common/Pagination";

const Notification: React.FC = () => {
  const { user } = useUserStore();
  const [page, setPage] = useState(1);
  const limit = 10;
  const {
    notifications,
    isLoading,
    readNotification,
    readAllNotifications,
    isConnected,
    total,
  } = useNotification(user?.id, page, limit);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const navigate = useNavigate();

  // Luôn refetch notification khi vào trang này và khi socket connect xong
  useEffect(() => {
    // Lấy socket từ window hoặc context nếu bạn có, hoặc từ useNotification nếu hook trả về
    const socket = (window as any).socket || undefined;
    if (socket && user?.id && isConnected) {
      socket.emit("getNotifications", { user_id: user.id, page, limit });
    }
  }, [user?.id, isConnected, page, limit]);

  const totalPages = Math.max(1, Math.ceil((total || 0) / limit));

  return (
    <div className="max-w-2xl mx-auto mt-8 mb-8 p-4 bg-white rounded-xl shadow-md min-h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#5D4037]">Tất cả thông báo</h2>
        {notifications && notifications.some((n) => !n.is_read) && (
          <button
            className="text-xs text-blue-600 hover:underline focus:outline-none"
            onClick={() => readAllNotifications && readAllNotifications()}
          >
            Đánh dấu đã đọc tất cả
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <button
          className={`px-5 py-1.5 rounded-full font-semibold border transition-all duration-150 shadow-sm
            ${
              filter === "all"
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
            }`}
          onClick={() => setFilter("all")}
        >
          Tất cả
        </button>
        <button
          className={`px-5 py-1.5 rounded-full font-semibold border transition-all duration-150 shadow-sm
            ${
              filter === "unread"
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
            }`}
          onClick={() => setFilter("unread")}
        >
          Chưa đọc
        </button>
      </div>
      {isLoading ? (
        <div className="text-center text-gray-500 py-8">Đang tải...</div>
      ) : notifications && notifications.length > 0 ? (
        <>
          <div ref={notificationRef}>
            {(filter === "all"
              ? notifications
              : notifications.filter((n: any) => !n.is_read)
            ).map((item: any, idx: number) => (
              <div
                key={idx}
                onClick={() => {
                  readNotification && readNotification(item.id);
                  if (item.url) {
                    navigate(item.url);
                  }
                }}
                className={`
                  flex gap-3 items-start p-4 mb-2 rounded-lg cursor-pointer transition
                  ${
                    !item.is_read
                      ? "bg-[#fff7e6] border-l-4 border-[#fbbf24]"
                      : "bg-gray-50"
                  }
                  hover:bg-[#f5e1c5]
                `}
              >
                <div className="pt-1">
                  {item.type === "approved" ? (
                    <span className="text-green-500">
                      <CheckCircle size={20} />
                    </span>
                  ) : item.type === "rejected" ? (
                    <span className="text-red-500">
                      <AlertCircle size={20} />
                    </span>
                  ) : (
                    <span className="text-blue-500">
                      <Info size={20} />
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-semibold truncate ${
                      item.type === "approved"
                        ? "text-green-700"
                        : item.type === "rejected"
                        ? "text-red-700"
                        : "text-[#25626a]"
                    }`}
                  >
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString("vi-VN")
                      : ""}
                  </div>
                  <div
                    className={`text-sm mt-1 break-words ${
                      item.type === "approved"
                        ? "text-green-900"
                        : item.type === "rejected"
                        ? "text-red-900"
                        : "text-[#5D4037]"
                    }`}
                  >
                    {item.content}
                  </div>
                </div>
                {!item.is_read && (
                  <span className="ml-2 mt-1 inline-block w-2 h-2 rounded-full bg-red-400"></span>
                )}
              </div>
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <div className="text-center text-gray-500 py-8">
          Không có thông báo nào
        </div>
      )}
    </div>
  );
};

export default Notification;
