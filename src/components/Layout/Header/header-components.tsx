import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "@/constant";

import * as React from "react";
import { Link } from "react-router-dom";

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
        onClick={() => navigate(ROUTERS.IMAGE_RESTORATION)}
        className={`transition-colors font-medium ${
          isActiveRoute(ROUTERS.IMAGE_RESTORATION)
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
        Quiz
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
