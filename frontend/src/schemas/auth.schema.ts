import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6,"Minimum 6 characters")
})

export const registerSchema = z.object({
    companyName: z.string().min(2),
    companySlug: z.string().min(2),
    adminName: z.string().min(2),
    email: z.email(),
    password: z.string().min(6)
});

export const forgotPasswordSchema = z.object({
    email: z.email("Invalid Email")
});

export const resetPasswordSchema = z.object({
    password: z.string().min(6,"Password must be atleast 6 characters"),
    confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword,
    { message:"Passwords do not match", path:["confirmPassword"] }
);

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;