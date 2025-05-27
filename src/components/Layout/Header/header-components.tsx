import React from "react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "@/constant";

import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUserStore } from "@/store/useUserStore";
import { Bell, CheckCircle, AlertCircle, Info, List } from "lucide-react";

export const Brand = () => {
  return (
    <Link to={ROUTERS.HOME} className="flex items-center gap-1">
      <img
        src={import.meta.env.VITE_BASE_URL + "images/vietnam.png"}
        alt="Vietnamese Flag"
        className="w-10 h-8 object-cover"
      />
      <div className="px-3 py-1 rounded">
        <span className="text-2xl font-bold text-[#5D4037]">Việt Sử</span>
      </div>
    </Link>
  );
};

export const NavigationItems = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
      <button
        onClick={() => navigate(ROUTERS.HOME)}
        className={`transition-colors font-medium ${
          isActiveRoute(ROUTERS.HOME) || isActiveRoute(ROUTERS.DEFAULT)
            ? "text-[#D12827]"
            : "text-[#5D4037] hover:text-[#D12827]"
        }`}
      >
        Trang chủ
      </button>
      <button
        onClick={() => navigate(ROUTERS.HISTORY_DOCUMENT)}
        className={`transition-colors font-medium ${
          isActiveRoute(ROUTERS.HISTORY_DOCUMENT)
            ? "text-[#D12827]"
            : "text-[#5D4037] hover:text-[#D12827]"
        }`}
      >
        Tài liệu
      </button>
      <button
        onClick={() => navigate(ROUTERS.IMAGE_RESTORATION)}
        className={`transition-colors font-medium ${
          isActiveRoute(ROUTERS.IMAGE_RESTORATION)
            ? "text-[#D12827]"
            : "text-[#5D4037] hover:text-[#D12827]"
        }`}
      >
        Phục chế ảnh
      </button>
      <button
        onClick={() => navigate(ROUTERS.FORUM)}
        className={`transition-colors font-medium ${
          isActiveRoute(ROUTERS.FORUM)
            ? "text-[#D12827]"
            : "text-[#5D4037] hover:text-[#D12827]"
        }`}
      >
        Diễn đàn
      </button>
      <button
        onClick={() => navigate(ROUTERS.QUIZ)}
        className={`transition-colors font-medium ${
          isActiveRoute(ROUTERS.QUIZ)
            ? "text-[#D12827]"
            : "text-[#5D4037] hover:text-[#D12827]"
        }`}
      >
        Bộ câu hỏi
      </button>
    </div>
  );
};

interface listItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  href: string;
  logo: string;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, listItemProps>(
  ({ className, title, children, href, logo, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            to={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="flex items-center space-x-2">
              <img src={logo} alt={title} className="w-6 h-6 object-contain" />
              <div className="text-sm font-medium leading-none">{title}</div>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export const AccountDropdown = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center gap-2 px-4 py-2 rounded bg-[#5D4037] text-white hover:opacity-90 transition-opacity"
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        {/* User Avatar */}
        <Avatar className="bg-[#5D4037] border-4 border-[#FDDAA7]">
          <AvatarImage src={user?.avatar} alt={user?.fullname || "avatar"} />
          <AvatarFallback className="bg-[#5D4037] text-[#FDDAA7]">
            {user?.fullname?.[0] || "U"}
          </AvatarFallback>
        </Avatar>
        <svg
          className="w-4 h-4 text-[#FDDAA7]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {openMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-[#5D4037] border border-[#FDDAA7] rounded-xl shadow-lg z-20 py-2 transition-all duration-200">
          <button
            className="flex items-center gap-3 w-full text-left px-5 py-3 text-base text-[#FDDAA7] hover:bg-[#7c5a3a] transition items-center whitespace-nowrap"
            onClick={() => {
              setOpenMenu(false);
              navigate(ROUTERS.MY_QUIZ);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
              style={{ minWidth: 20 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 6.75v10.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V6.75m-15 0A2.25 2.25 0 016.75 4.5h10.5a2.25 2.25 0 012.25 2.25m-15 0v.75a.75.75 0 00.75.75h14.25a.75.75 0 00.75-.75v-.75m-15 0h15"
              />
            </svg>
            <span className="whitespace-nowrap">Bộ câu hỏi</span>
          </button>
          <button
            className="flex items-center gap-3 w-full text-left px-5 py-3 text-base text-[#FDDAA7] hover:bg-[#7c5a3a] transition items-center whitespace-nowrap"
            onClick={() => {
              setOpenMenu(false);
              navigate("/posts");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
              style={{ minWidth: 20 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-10.5A2.25 2.25 0 014.5 17.25V6.75m15 0A2.25 2.25 0 0017.25 4.5h-10.5A2.25 2.25 0 004.5 6.75m15 0v.75a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75v-.75m15 0h-15"
              />
            </svg>
            <span className="whitespace-nowrap">Bài đăng</span>
          </button>
          <button
            className="flex items-center gap-3 w-full text-left px-5 py-3 text-base text-[#FDDAA7] hover:bg-[#7c5a3a] transition items-center whitespace-nowrap"
            onClick={() => {
              setOpenMenu(false);
              navigate("/profile");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
              style={{ minWidth: 20 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L7.5 19.79l-4 1 1-4 14.362-14.303z"
              />
            </svg>
            <span className="whitespace-nowrap">Chỉnh sửa thông tin</span>
          </button>
          <button
            className="flex items-center gap-3 w-full text-left px-5 py-3 text-base text-red-300 hover:bg-[#7c5a3a] transition items-center whitespace-nowrap"
            onClick={onLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
              style={{ minWidth: 20 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m-6-3h12m0 0l-3-3m3 3l-3 3"
              />
            </svg>
            <span className="whitespace-nowrap">Đăng xuất</span>
          </button>
        </div>
      )}
    </div>
  );
};

// Notification Dropdown Component
export const NotificationDropdown = ({
  notifications,
  isLoading,
  readNotification,
  readAllNotifications,
  openNotification,
  setOpenNotification,
  notificationRef,
  page,
  setPage,
  total,
}: {
  notifications: any[];
  isLoading: boolean;
  readNotification: (id: number | string) => void;
  readAllNotifications: () => void;
  openNotification: boolean;
  setOpenNotification: React.Dispatch<React.SetStateAction<boolean>>;
  notificationRef: React.RefObject<HTMLDivElement>;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  total?: number;
}) => {
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);
  const prevScroll = useRef<{
    scrollHeight: number;
    scrollTop: number;
    length: number;
    atBottom: boolean;
  }>({
    scrollHeight: 0,
    scrollTop: 0,
    length: 0,
    atBottom: false,
  });

  const handleLoadMore = () => {
    if (listRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = listRef.current;
      prevScroll.current = {
        scrollHeight,
        scrollTop,
        length: notifications.length,
        atBottom: scrollTop + clientHeight >= scrollHeight - 2,
      };
    }
    setPage && page && setPage(page + 1);
  };

  useEffect(() => {
    if (
      listRef.current &&
      page &&
      page > 1 &&
      notifications.length > prevScroll.current.length
    ) {
      const { scrollHeight, scrollTop, atBottom } = prevScroll.current;
      const newScrollHeight = listRef.current.scrollHeight;
      if (atBottom) {
        listRef.current.scrollTop = scrollTop;
      } else {
        listRef.current.scrollTop =
          scrollTop + (newScrollHeight - scrollHeight);
      }
    }
    prevScroll.current.length = notifications.length;
  }, [notifications, page]);

  return (
    <div className="relative" ref={notificationRef}>
      <button
        className="relative p-2 rounded-full hover:bg-[#f5e1c5] transition"
        onClick={() => setOpenNotification((prev) => !prev)}
      >
        <Bell className="w-6 h-6 text-[#5D4037]" />
        {notifications &&
          notifications.length > 0 &&
          notifications.some((n) => !n.is_read) && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          )}
      </button>
      {openNotification && (
        <div
          className="absolute right-0 mt-2 w-[420px] bg-white border border-gray-200 rounded-xl shadow-lg z-11 py-2 max-h-96 overflow-y-auto"
          ref={listRef}
        >
          <div className="px-4 py-2 font-bold text-[#5D4037] border-b flex items-center justify-between">
            <span>Thông báo</span>
            {notifications && notifications.some((n) => !n.is_read) && (
              <button
                className="text-xs text-blue-600 hover:underline focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  readAllNotifications && readAllNotifications();
                }}
              >
                Đánh dấu đã đọc tất cả
              </button>
            )}
          </div>
          {/* Link tất cả thông báo */}
          <div className="px-4 py-2 border-b flex justify-center">
            <span
              className="inline-flex items-center gap-2 text-base font-medium text-blue-600 cursor-pointer px-3 py-1 rounded-md transition hover:bg-blue-50 hover:text-blue-800"
              onClick={() => navigate(ROUTERS.NOTIFICATION)}
            >
              <List size={18} />
              Tất cả thông báo
            </span>
          </div>
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Đang tải...</div>
          ) : notifications && notifications.length > 0 ? (
            <>
              {notifications.map((item: any, idx: number) => (
                <div
                  key={idx}
                  onClick={() => {
                    readNotification && readNotification(item.id);
                    if (item.url) {
                      navigate(item.url);
                    }
                  }}
                  className={`
                    px-4 py-3 border-b last:border-b-0 flex gap-3 items-start
                    hover:bg-[#f5e1c5] cursor-pointer transition
                    ${
                      !item.is_read
                        ? "bg-[#fff7e6] border-l-4 border-[#fbbf24]"
                        : ""
                    }
                  `}
                >
                  {/* Icon trạng thái */}
                  <div className="pt-1">
                    {item.type === "approved" ? (
                      <span className="text-green-500">
                        <CheckCircle size={18} />
                      </span>
                    ) : item.type === "rejected" ? (
                      <span className="text-red-500">
                        <AlertCircle size={18} />
                      </span>
                    ) : (
                      <span className="text-blue-500">
                        <Info size={18} />
                      </span>
                    )}
                  </div>
                  <div
                    className={`flex-1 min-w-0 ${
                      item.type === "approved"
                        ? ""
                        : item.type === "rejected"
                        ? ""
                        : ""
                    }`}
                  >
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
                </div>
              ))}
              {/* Nút xem thêm */}
              {notifications.length < (total || 0) && (
                <div className="flex justify-center py-2">
                  <button
                    className="px-4 py-2 bg-[#f5e1c5] rounded text-[#5D4037] hover:bg-[#fbbf24] transition"
                    onClick={handleLoadMore}
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang tải..." : "Xem thêm"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Không có thông báo nào
            </div>
          )}
        </div>
      )}
    </div>
  );
};
