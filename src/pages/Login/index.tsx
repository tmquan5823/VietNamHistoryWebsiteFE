import { toast } from '@/components/ui/sonner';
import React, { useState } from 'react';
import LoginForm from './login-components/LoginForm';
import RegisterForm from './login-components/RegisterForm';
import LeftContent from './login-components/LeftContent';
import { z } from 'zod';
import { loginSchema, registerSchema } from '@/utils/schema';

type LoginFormData = z.infer<ReturnType<typeof loginSchema>>;
type RegisterFormData = z.infer<ReturnType<typeof registerSchema>>;

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (data: LoginFormData) => {
    console.log(data)
  };

  const handleRegister = async (data: RegisterFormData) => {
    console.log(data)
    try {
      // Handle register API call here
      toast.success('Đăng ký thành công');
    } catch (error) {
      toast.error('Đăng ký thất bại');
    }
  };

  return (
    <div className="flex min-h-screen">
      <LeftContent />

      {/* Right side - Login/Register form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#FDDAA7]/10">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-[#5D4037] mb-2">
              {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </h2>
            <p className="text-gray-600 text-sm">
              Đăng nhập để truy cập đầy đủ tính năng
            </p>
          </div>

          {/* Toggle buttons with sliding background */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1 relative">
            <div
              className={`absolute top-1 w-1/2 h-[calc(100%-8px)] bg-white rounded-md shadow-sm transition-transform duration-300 ease-in-out ${
                isLogin ? 'translate-x-0' : 'translate-x-full'
              }`}
            />
            
            <button
              type="button"
              className={`flex-1 py-2 text-sm rounded-md transition-colors duration-300 z-10 relative ${
                isLogin ? 'font-semibold text-[#5D4037]' : 'text-gray-500'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm rounded-md transition-colors duration-300 z-10 relative ${
                !isLogin ? 'font-semibold text-[#5D4037]' : 'text-gray-500'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Đăng ký
            </button>
          </div>

          {isLogin ? (
            <LoginForm 
              onSubmit={handleLogin} 
              onToggleForm={() => setIsLogin(false)} 
            />
          ) : (
            <RegisterForm 
              onSubmit={handleRegister} 
              onToggleForm={() => setIsLogin(true)} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;