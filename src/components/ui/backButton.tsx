import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  className = "",
  children,
}) => {
  const navigate = useNavigate();
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-[#5D4037] rounded font-semibold transition ${className}`}
      onClick={onClick ? onClick : () => navigate(-1)}
      type="button"
    >
      <FaArrowLeft />
      {children || "Quay lại"}
    </button>
  );
};

export default BackButton;
