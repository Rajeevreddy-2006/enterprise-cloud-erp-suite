import { Router } from "express";
import notificationController from "../controllers/notification.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createNotificationSchema, updateNotificationSchema, } from "../validators/notification.validator";

const router = Router();

router.use(authenticate);

router.get("/",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),notificationController.getAllNotifications);

router.patch(
    "/:id/read",
    authorize([
        "SUPER_ADMIN",
        "TENANT_ADMIN",
    ]),
    notificationController.markAsRead
);

router.patch(
    "/read-all",
    authorize([
        "SUPER_ADMIN",
        "TENANT_ADMIN",
    ]),
    notificationController.markAllAsRead
);

router.get("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),notificationController.getNotificationById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),validate(createNotificationSchema),notificationController.createNotification);

router.put("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),validate(updateNotificationSchema),notificationController.updateNotification);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),notificationController.deleteNotification);

export default router;