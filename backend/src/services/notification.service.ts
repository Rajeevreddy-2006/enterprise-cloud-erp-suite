import notificationRepository from "../repositories/notification.repository";
import { CreateNotificationDto, UpdateNotificationDto, } from "../types/notification.types";
import { RoleType } from "../generated/prisma/enums";
import AppError from "../utils/AppError";
import { getIO } from "../socket";

class NotificationService {

  async getAllNotifications(tenantId: string,role: RoleType) {
    return notificationRepository.getAllNotifications(tenantId,role);
  }

  async getNotificationById(id: string) {
    return notificationRepository.getNotificationById(id);
  }

  async createNotification(data: CreateNotificationDto) {
    const notification = await notificationRepository.createNotification(data);
    try {
        getIO().emit("notification",notification);
    } catch (error) {
        console.error("Socket notification failed:",error);
    }
    return notification;
  }

  async updateNotification(id: string,data: UpdateNotificationDto) {
    const notification = await notificationRepository.getNotificationById(id);
    if (!notification) {
      throw new AppError("Notification not found",404);
    }
    return notificationRepository.updateNotification(id,data);
  }

  async deleteNotification(id: string) {
    const notification = await notificationRepository.getNotificationById(id);
    if (!notification) {
      throw new AppError("Notification not found",404);
    }
    return notificationRepository.deleteNotification(id);
  }
}

export default new NotificationService();