import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RegisterFormData = z.infer<ReturnType<typeof registerSchema>>;

interface RegisterFormProps {
  onToggleForm: () => void;
  onSubmit: (data: RegisterFormData) => Promise<void>;
}

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema()),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 font-semibold text-[#5D4037]">
                Họ và tên
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập họ và tên"
                  className="h-12 bg-gray-50 border-0 focus:border-0 focus:ring-1 focus:ring-[#5D4037]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 font-semibold text-[#5D4037]">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập email"
                  className="h-12 bg-gray-50 border-0 focus:border-0 focus:ring-1 focus:ring-[#5D4037]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 font-semibold text-[#5D4037]">
                Mật khẩu
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="h-12 bg-gray-50 border-0 focus:border-0 focus:ring-1 focus:ring-[#5D4037]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 font-semibold text-[#5D4037]">
                Nhập lại mật khẩu
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className="h-12 bg-gray-50 border-0 focus:border-0 focus:ring-1 focus:ring-[#5D4037]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="w-full py-3 bg-[#5D4037] text-white rounded-md hover:opacity-90 transition-opacity"
          disabled={form.formState.isSubmitting}
        >
          Đăng ký
        </button>

        <div className="text-center mt-4"></div>
      </form>
    </Form>
  );
};

export default RegisterForm;
