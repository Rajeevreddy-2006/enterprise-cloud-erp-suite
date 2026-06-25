import { Request, Response } from "express";
import notificationService from "../services/notification.service";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class NotificationController {

  getAllNotifications = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const notifications = await notificationService.getAllNotifications(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(notifications,"Notifications fetched successfully")
      );
    }
  );

  getNotificationById = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const notification = await notificationService.getNotificationById(id);
      if (!notification) {
        throw new AppError("Notification not found",404);
      }
      return res.status(200).json(
        successResponse(notification,"Notification fetched successfully")
      );
    }
  );

  createNotification = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const notification = await notificationService.createNotification({...req.body,tenantId: user.tenantId,});
      return res.status(201).json(
        successResponse(notification,"Notification created successfully")
      );
    }
  );

  updateNotification = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const notification = await notificationService.updateNotification(id,req.body);
      return res.status(200).json(
        successResponse(notification,"Notification updated successfully")
      );
    }
  );

  deleteNotification = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      await notificationService.deleteNotification(id);
      return res.status(200).json(
        successResponse(null,"Notification deleted successfully")
      );
    }
  );
}

export default new NotificationController();