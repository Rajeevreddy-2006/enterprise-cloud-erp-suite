import { z } from "zod";

export const createNotificationSchema = z.object({
  title: z.string()
    .min(2, "Title must be at least 2 characters"),

  message: z.string()
    .min(2, "Message must be at least 2 characters"),
});

export const updateNotificationSchema = z.object({
  isRead: z.boolean(),
});