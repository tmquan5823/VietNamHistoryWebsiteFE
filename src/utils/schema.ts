import { z } from "zod";
import { regexPassword } from "@/constant";

export const loginSchema = () =>
  z.object({
    email: z
      .string()
      .min(1, { message: "Email không được để trống" })
      .email({ message: "Email không hợp lệ" })
      .max(100, { message: "Email không được vượt quá 100 ký tự" }),
    password: z
      .string()
      .min(1, { message: "Mật khẩu không được để trống" })
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
      .max(32, { message: "Mật khẩu không được vượt quá 32 ký tự" })
  });

export const registerSchema = () =>
  z.object({
    fullName: z
      .string()
      .min(1, { message: "Họ và tên không được để trống" })
      .max(50, { message: "Họ và tên không được vượt quá 50 ký tự" })
      .regex(/^[a-zA-ZÀ-ỹ\s]*$/, { message: "Họ và tên chỉ được chứa chữ cái và khoảng trắng" }),
    email: z
      .string()
      .min(1, { message: "Email không được để trống" })
      .email({ message: "Email không hợp lệ" })
      .max(100, { message: "Email không được vượt quá 100 ký tự" }),
    password: z
      .string()
      .min(1, { message: "Mật khẩu không được để trống" })
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
      .max(32, { message: "Mật khẩu không được vượt quá 32 ký tự" })
      .regex(regexPassword, { message: "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt" }
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Xác nhận mật khẩu không được để trống" }),
    gender: z.enum(["male", "female", "other"], { required_error: "Vui lòng chọn giới tính" }),
    birthday: z.string().min(1, { message: "Vui lòng chọn ngày sinh" }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ['confirmPassword']
  });

export const quizSetSchema = () =>
  z.object({
    title: z
      .string()
      .min(1, { message: "Tiêu đề không được để trống" })
      .max(100, { message: "Tiêu đề không được vượt quá 100 ký tự" }),
    description: z
      .string()
      .max(300, { message: "Mô tả không được vượt quá 300 ký tự" })
      .optional()
      .or(z.literal("").transform(() => undefined)),
    topic_ids: z.array(z.number()).optional(),
    thumbnail: z.string().optional(),
    isPublic: z.boolean(),
  });

export const postSchema = z.object({
  title: z.string().min(3, "Tiêu đề tối thiểu 3 ký tự").max(255, "Tiêu đề tối đa 255 ký tự"),
  content: z.string().min(10, "Nội dung tối thiểu 10 ký tự"),
  topic_id: z.array(z.number()).max(3, "Chỉ được chọn tối đa 3 chủ đề"),
  status: z.string().optional(),
});

export const profileUpdateSchema = z.object({
  fullname: z.string().min(1, { message: "Họ tên không được để trống" }).max(50, { message: "Họ tên không được vượt quá 50 ký tự" }),
  gender: z.enum(["male", "female", "other"], { required_error: "Vui lòng chọn giới tính" }),
  birthday: z.string()
    .min(1, { message: "Vui lòng chọn ngày sinh" })
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      const min = new Date("1900-01-01");
      return !isNaN(date.getTime()) && date <= now && date >= min;
    }, { message: "Ngày sinh không hợp lệ hoặc lớn hơn ngày hiện tại" }),
  avatar: z.instanceof(File).optional(),
});
export type ProfileUpdateType = z.infer<typeof profileUpdateSchema>;

export const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(8, { message: "Mật khẩu mới phải có ít nhất 8 ký tự" }).regex(regexPassword, { message: "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt" }),
  confirmNewPassword: z.string().min(1, { message: "Vui lòng nhập lại mật khẩu mới" }),
}).refine((data) => data.oldPassword !== data.newPassword, {
  message: "Mật khẩu mới phải khác mật khẩu cũ",
  path: ["newPassword"],
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmNewPassword"],
});
export type ChangePasswordType = z.infer<typeof changePasswordSchema>;