import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormData = z.infer<ReturnType<typeof loginSchema>>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onToggleForm: () => void;
  onForgotPassword: () => void;
}

const LoginForm = ({
  onSubmit,
  onForgotPassword,
}: LoginFormProps) => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema()),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <button
          type="submit"
          className="w-full py-3 bg-[#5D4037] text-white rounded-md hover:opacity-90 transition-opacity"
          disabled={form.formState.isSubmitting}
        >
          Đăng nhập
        </button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-[#D0342C] hover:underline"
          >
            Quên mật khẩu?
          </button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
