import { Request, Response } from "express";
import userService from "../services/user.service";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import auditLogService from "../services/auditLog.service";

class UserController {

  getAllUsers = asyncHandler(
    async (req: Request, res: Response) => {
        const user = (req as any).user;
        const users = await userService.getAllUsers(user.tenantId,user.role);
        return res.status(200).json(
            successResponse(users,"Users fetched successfully")
        );
    }
  );

  getUserById = asyncHandler(
    async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const user = await userService.getUserById(id);
        if (!user) {
            throw new AppError("User not found",404);
        }
        return res.status(200).json(
            successResponse(user,"User fetched successfully")
        );
    }
  );

  createUser = asyncHandler(
    async (req: Request, res: Response) => {
        const currentUser = (req as any).user;
        const user = await userService.createUser({...req.body,tenantId: currentUser.tenantId,});
        await auditLogService.createLog({
        action: "CREATE",
        entity: "USER",
        entityId: user.id,
        userId: currentUser.id,
        tenantId: currentUser.tenantId,
        });
        return res.status(201).json(
            successResponse(user,"User created successfully")
        );
    }
  );

  updateUser = asyncHandler(
    async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const user = await userService.updateUser(id,req.body);
        await auditLogService.createLog({
            action: "UPDATE",
            entity: "USER",
            entityId: user.id,
            userId: user.id,
            tenantId: user.tenantId,
        });
        return res.status(200).json(
            successResponse(user,"User updated successfully")
        );
    }
  );

  deleteUser = asyncHandler(
    async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const user = (req as any).user;
        await userService.deleteUser(id);
        await auditLogService.createLog({
            action: "DELETE",
            entity: "USER",
            entityId: id,
            userId: user.id,
            tenantId: user.tenantId,
        });
        return res.status(200).json(
            successResponse(null,"User deleted successfully")
        );
    }
  );
}

export default new UserController();