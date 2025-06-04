import { authApi } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTERS } from "@/constant";

const ResetPassword: React.FC = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toast.success("Mật khẩu đã được cập nhật thành công!");
      navigate(ROUTERS.LOGIN);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Có lỗi xảy ra!");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otp || !newPassword || !confirmPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }
    resetPassword({ email, otp, newPassword });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf6e3]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-[#5D4037] text-center">
          Đặt lại mật khẩu
        </h2>
        <div className="mb-5">
          <label
            className="block text-[#5D4037] font-semibold mb-2 text-lg"
            htmlFor="otp"
          >
            Mã xác thực (OTP)
          </label>
          <input
            id="otp"
            type="text"
            className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D4037] bg-gray-50 text-lg"
            placeholder="Nhập mã xác thực gửi về email"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-[#5D4037] font-semibold mb-2 text-lg"
            htmlFor="newPassword"
          >
            Mật khẩu mới
          </label>
          <input
            id="newPassword"
            type="password"
            className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D4037] bg-gray-50 text-lg"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <div className="mb-8">
          <label
            className="block text-[#5D4037] font-semibold mb-2 text-lg"
            htmlFor="confirmPassword"
          >
            Xác nhận mật khẩu mới
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D4037] bg-gray-50 text-lg"
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#5D4037] text-white font-bold py-4 text-lg rounded-lg hover:bg-[#5D4037]/90 transition disabled:opacity-60"
          disabled={isPending}
        >
          {isPending ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
        </button>
        <button
          type="button"
          className="w-full mt-4 bg-gray-200 text-[#5D4037] font-semibold py-3 text-base rounded-lg hover:bg-gray-300 transition"
          onClick={() => navigate(ROUTERS.LOGIN)}
          disabled={isPending}
        >
          Quay lại đăng nhập
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
