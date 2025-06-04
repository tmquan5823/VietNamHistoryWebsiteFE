import { authApi } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "@/constant";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      toast.success("Mã xác thực đã được gửi về email của bạn!");
      navigate(ROUTERS.RESET_PASSWORD.replace(":email", email));
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Có lỗi xảy ra!");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Vui lòng nhập email!");
      return;
    }
    forgotPassword(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf6e3]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-[#5D4037] text-center">
          Quên mật khẩu
        </h2>
        <div className="mb-6">
          <label
            className="block text-[#5D4037] font-semibold mb-3 text-lg"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D4037] bg-gray-50 text-lg"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#5D4037] text-white font-bold py-4 text-lg rounded-lg hover:bg-[#5D4037]/90 transition disabled:opacity-60 mt-2"
          disabled={isPending}
        >
          {isPending ? "Đang gửi..." : "Quên mật khẩu"}
        </button>
        <button
          type="button"
          className="w-full mt-4 bg-gray-200 text-[#5D4037] font-semibold py-3 text-base rounded-lg hover:bg-gray-300 transition"
          onClick={() => navigate("/login")}
          disabled={isPending}
        >
          Quay lại đăng nhập
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
