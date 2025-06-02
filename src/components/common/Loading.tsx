import React from "react";

const spinKeyframes = `@keyframes spin-fallback { 100% { transform: rotate(360deg); } }`;

const Loading: React.FC<{
  size?: number;
  className?: string;
  fullscreen?: boolean;
}> = ({ size = 80, className = "", fullscreen = false }) => {
  // Fallback style nếu Tailwind chưa có animate-spin-slow
  const fallbackStyle: React.CSSProperties = {
    animation: "spin-fallback 2s linear infinite",
  };

  return (
    <div
      className={`${
        fullscreen
          ? "fixed inset-0 z-50 flex items-center justify-center bg-white/70"
          : "flex flex-col items-center justify-center w-full h-full py-8"
      }
        ${className}`}
      style={
        fullscreen ? { left: 0, top: 0, width: "100vw", height: "100vh" } : {}
      }
    >
      {/* Fallback keyframes nếu Tailwind chưa có */}
      <style>{spinKeyframes}</style>
      <img
        src={import.meta.env.BASE_URL + "/images/loading.webp"}
        alt="Loading..."
        width={size}
        height={size}
        className="animate-spin-slow mb-2"
        style={{ maxWidth: size, maxHeight: size, ...fallbackStyle }}
      />
      <span className="text-[#5D4037] text-sm font-medium mt-2">
        Đang tải...
      </span>
    </div>
  );
};

export default Loading;

// CSS: Thêm vào global hoặc tailwind.config.js
// .animate-spin-slow { animation: spin 2s linear infinite; }
// @keyframes spin { 100% { transform: rotate(360deg); } }
