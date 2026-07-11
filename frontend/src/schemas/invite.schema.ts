import { z } from "zod";

export const inviteSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),

    departmentId: z.string().min(1, "Department is required"),

    designation: z.string().min(1),

    role: z.string().min(1),
});

export type InviteFormData =
    z.infer<typeof inviteSchema>;