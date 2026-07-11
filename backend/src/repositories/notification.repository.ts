import prisma from "../config/database";
import { CreateNotificationDto, UpdateNotificationDto, } from "../types/notification.types";
import { RoleType } from "../generated/prisma/enums";

class NotificationRepository {

  async getAllNotifications(tenantId: string,role: RoleType) {
    if (role === "TENANT_ADMIN") {
      return prisma.notification.findMany({
        include: { tenant: true, },
        orderBy: { createdAt: "desc", },
      });
    }
    return prisma.notification.findMany({
      where: { tenantId, },
      include: { tenant: true, },
      orderBy: { createdAt: "desc", },
    });
  }

  async markAsRead(
    id: string,
    tenantId: string
  ) {
    return prisma.notification.update({
      where: { id, },
      data: { isRead: true, },
    });
  }

  async markAllAsRead(tenantId: string) {
    return prisma.notification.updateMany({
      where: { tenantId, isRead: false, },
      data: { isRead: true, },
    });
  }

  async getNotificationById(id: string) {
    return prisma.notification.findUnique({
      where: { id },
      include: { tenant: true, },
    });
  }

  async createNotification(data: CreateNotificationDto) {
    return prisma.notification.create({
      data,
      include: { tenant: true, },
    });
  }

  async updateNotification(id: string,data: UpdateNotificationDto) {
    return prisma.notification.update({
      where: { id },
      data,
      include: { tenant: true, },
    });
  }

  async deleteNotification(id: string) {
    return prisma.notification.delete({
      where: { id },
    });
  }
}

export default new NotificationRepository();