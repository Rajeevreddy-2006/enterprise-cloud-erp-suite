import { z } from "zod";

export const notificationSchema = z.object({
    title:z.string().min(2),
    message:z.string().min(2)
});

export type NotificationFormData = z.infer<typeof notificationSchema>;