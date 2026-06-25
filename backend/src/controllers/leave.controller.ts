import { Request, Response } from "express";
import leaveService from "../services/leave.service";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import auditLogService from "../services/auditLog.service";

class LeaveController {

  getAllLeaves = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const leaves = await leaveService.getAllLeaves(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(leaves,"Leaves fetched successfully")
      );
    }
  );

  getLeaveById = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const leave = await leaveService.getLeaveById(id);
      if (!leave) {
        throw new AppError("Leave not found",404);
      }
      return res.status(200).json(
        successResponse(leave,"Leave fetched successfully")
      );
    }
  );

  createLeave = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const leave = await leaveService.createLeave({...req.body,tenantId: user.tenantId,});
      await auditLogService.createLog({
        action: "CREATE",
        entity: "LEAVE",
        entityId: leave.id,
        userId: user.id,
        tenantId: user.tenantId,
      });
      return res.status(201).json(
        successResponse(leave,"Leave created successfully")
      );
    }
  );

  updateLeave = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      const leave = await leaveService.updateLeave(id,req.body);
      await auditLogService.createLog({
        action: "UPDATE",
        entity: "LEAVE",
        entityId: leave.id,
        userId: user.id,
        tenantId: user.tenantId,
      });
      return res.status(200).json(
        successResponse(leave,"Leave updated successfully")
      );
    }
  );

  deleteLeave = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      await leaveService.deleteLeave(id);
      await auditLogService.createLog({
        action: "DELETE",
        entity: "LEAVE",
        entityId: req.params.id as string,
        userId: user.id,
        tenantId: user.tenantId,
      });
      return res.status(200).json(
        successResponse(null,"Leave deleted successfully")
      );
    }
  );

  approveLeave = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      const leave = await leaveService.approveLeave(id);
      await auditLogService.createLog({
        action: "APPROVE",
        entity: "LEAVE",
        entityId: leave.id,
        userId: user.id,
        tenantId: user.tenantId,
      });
      return res.status(200).json(
        successResponse(leave,"Leave approved successfully")
      );
    }
  );

  rejectLeave = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      const leave = await leaveService.rejectLeave(id);
      await auditLogService.createLog({
        action: "REJECT",
        entity: "LEAVE",
        entityId: leave.id,
        userId: user.id,
        tenantId: user.tenantId,
      });
      return res.status(200).json(
        successResponse(leave,"Leave rejected successfully")
      );
    }
  );

}

export default new LeaveController();