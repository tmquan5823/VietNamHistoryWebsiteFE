import {
  MAX_LENGTH_INPUT as MAX_LENGTH,
  regexEmail,
  regexPassword,
} from "@/constant";
import { z } from "zod";
import { TFunction } from 'i18next';

export const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
  remember_me: z.boolean().default(false),
});

export const changePasswordFormSchema = z
  .object({
    email: z.string(),
    old_password: z.string().min(2),
    new_password: z.string().refine((password) => {
      return regexPassword.test(password);
    }, "__C_00_04.3"),
    new_password_confirmation: z.string().refine((confirmation) => {
      return regexPassword.test(confirmation);
    }, "__C_00_04.3"),
  })
  .superRefine((data, ctx) => {
    if (data.new_password !== data.new_password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "__C_00_04.7",
        path: ["new_password_confirmation"],
      });
    }
  });
export const changePasswordByTokenFormSchema = z
  .object({
    token: z.string(),
    password: z.string().refine((password) => {
      return regexPassword.test(password);
    }, "__C_00_04.3"),
    password_confirmation: z.string().refine((confirmation) => {
      return regexPassword.test(confirmation);
    }, "__C_00_04.3"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "__C_00_04.7",
        path: ["password_confirmation"],
      });
    }
  });
export const forgotPasswordFormSchema = z.object({
  email: z.string().refine((email) => {
    return regexEmail.test(email);
  }, "__C_00_03.5"),
});

export const visitorSchema = (t: (key: string) => string) =>
  z
    .object({
      id: z.string().uuid(),
      last_name_jp: z
        .string()
        .min(1, { message: "MSG_0037" })
        .max(MAX_LENGTH, { message: "MSG_0048" }),
      first_name_jp: z
        .string()
        .min(1, { message: "MSG_0038" })
        .max(MAX_LENGTH, { message: "MSG_0049" }),
      last_name_en: z
        .string()
        .min(1, { message: "MSG_0039" })
        .max(MAX_LENGTH, { message: "MSG_0050" }),
      first_name_en: z
        .string()
        .min(1, { message: "MSG_0040" })
        .max(MAX_LENGTH, { message: "MSG_0051" }),
      date_of_birth: z.string().date(t("MSG_0041")),
      is_representative: z.number().min(0, { message: "MSG_0047" }),
      phone_number: z
        .string()
        .min(8, { message: "MSG_0042" })
        .max(20, { message: "MSG_0042" }),
      email: z
        .string()
        .min(1, { message: "MSG_0007" })
        .max(MAX_LENGTH, { message: "MSG_0032" })
        .refine((email) => {
          return regexEmail.test(email);
        }, t("MSG_0010"))
        .optional()
        .or(z.string().length(0)),
      company_name: z
        .string()
        .min(1, { message: "MSG_0063" })
        .max(MAX_LENGTH, { message: "MSG_0052" })
        .optional()
        .or(z.string().length(0)),
      department: z
        .string()
        .min(1, { message: "MSG_0064" })
        .max(MAX_LENGTH, { message: "MSG_0053" })
        .optional()
        .or(z.string().length(0)),
      visitor_role: z.number().min(0, { message: "MSG_0043" }),
      identification_type: z.number().min(0, { message: "MSG_0066" }),
      identification_number: z
        .string()
        .min(1, { message: "MSG_0066" })
        .max(MAX_LENGTH, { message: "MSG_0055" }),
    })
    .superRefine((data, ctx) => {
      if (data.is_representative === 1) {
        if (!data.email) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "MSG_0007",
            path: ["email"],
          });
        }
        if (!data.company_name) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "MSG_0063",
            path: ["company_name"],
          });
        }
        if (!data.department) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "MSG_0064",
            path: ["department"],
          });
        }
      }
    });

export const groupSchema = (t: (key: string) => string) =>
  z.object({
    group_name: z
      .string()
      .min(1, { message: "MSG_0044" })
      .max(MAX_LENGTH, { message: "MSG_0069" }),
    boarding_port: z.number().default(0),
    maritime_PIC: z
      .string()
      .min(1, { message: "MSG_0006" })
      .max(MAX_LENGTH, { message: "MSG_0056" }),
    onboard_PIC: z
      .string()
      .min(1, { message: "MSG_0006" })
      .max(MAX_LENGTH, { message: "MSG_0057" }),
    onshore_PIC: z
      .string()
      .min(1, { message: "MSG_0006" })
      .max(MAX_LENGTH, { message: "MSG_0058" }),
    boarding_date: z.string().date(t("MSG_0045")),
    scheduled_boarding_time: z.string().refine((time) => {
      const pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return pattern.test(time);
    }, t("MSG_0065")),
    disembark_date: z.string().date(t("MSG_0068")),
    scheduled_disembark_time: z
      .string()
      .refine((time) => {
        const pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return pattern.test(time);
      })
      .optional()
      .or(z.string().length(0)),
    boarding_purpose: z.number().min(0, { message: "MSG_0046" }),
    remarks: z.string().max(MAX_LENGTH, { message: "MSG_0005" }).optional(),
    ship_number: z.string().max(MAX_LENGTH, { message: "MSG_0059" }).optional(),
    ship_model: z.string().max(MAX_LENGTH, { message: "MSG_0060" }).optional(),
    color: z.string().max(MAX_LENGTH, { message: "MSG_0061" }).optional(),
  });

export const registerSchema = (t: TFunction) =>
  z.object({
    fullName: z
      .string()
      .min(1, { message: t('validation.required', { field: t('form.fullName') }) })
      .max(50, { message: t('validation.maxLength', { field: t('form.fullName'), length: 50 }) }),
    email: z
      .string()
      .min(1, { message: t('validation.required', { field: t('form.email') }) })
      .email({ message: t('validation.email') }),
    password: z
      .string()
      .min(1, { message: t('validation.required', { field: t('form.password') }) })
      .min(8, { message: t('validation.minLength', { field: t('form.password'), length: 8 }) })
      .max(32, { message: t('validation.maxLength', { field: t('form.password'), length: 32 }) }),
    confirmPassword: z
      .string()
      .min(1, { message: t('validation.required', { field: t('form.confirmPassword') }) })
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('validation.passwordMatch'),
    path: ['confirmPassword']
  });

export const loginSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t('validation.required', { field: t('form.email') }) })
      .email({ message: t('validation.email') }),
    password: z
      .string()
      .min(1, { message: t('validation.required', { field: t('form.password') }) })
  });