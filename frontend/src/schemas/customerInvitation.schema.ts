import { z } from "zod";

export const inviteCustomerSchema = z.object({
    email: z.email("Invalid email address"),
});

export type InviteCustomerFormData =
    z.infer<
        typeof inviteCustomerSchema
    >;