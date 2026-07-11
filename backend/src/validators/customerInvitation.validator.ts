import { z } from "zod";

export const inviteCustomerSchema = z.object({
    email: z.email()
});

export const completeCustomerSchema = z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    address: z.string().min(5)
});

export const completeCustomerRegistrationSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    phone: z.string().min(10),
    address: z.string().min(5),
});