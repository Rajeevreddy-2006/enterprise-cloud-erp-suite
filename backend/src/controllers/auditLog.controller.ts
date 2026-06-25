import { Request, Response } from "express";
import auditLogService from "../services/auditLog.service";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class AuditLogController {

  getAllLogs = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const logs = await auditLogService.getAllLogs(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(logs,"Audit logs fetched successfully")
      );
    }
  );

  getLogById = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const log = await auditLogService.getLogById(id);
      if (!log) {
        throw new AppError("Audit log not found",404);
      }
      return res.status(200).json(
        successResponse(log,"Audit log fetched successfully")
      );
    }
  );

}

export default new AuditLogController();