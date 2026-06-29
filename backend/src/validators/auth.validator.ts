import { z } from "zod";

export const registerSchema = z.object({
  companyName: z.string().min(2),
  companySlug: z
    .string()
    .min(2)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain lowercase letters, numbers and hyphens only"
    ),
  adminName: z.string().min(2),
  email: z.email(),
  password: z.string().min(6)
});


export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
});

export const forgotPasswordSchema = z.object({
  email:z.email()
});


export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6)
});