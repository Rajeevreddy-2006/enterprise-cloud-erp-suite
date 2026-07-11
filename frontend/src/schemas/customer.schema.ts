import { z } from "zod";

export const customerSchema = z.object({
    name:z.string().min(2),
    email:z.email().optional(),
    phone:z.string().optional(),
    address:z.string().optional()
});

export type CustomerFormData = z.infer<typeof customerSchema>;