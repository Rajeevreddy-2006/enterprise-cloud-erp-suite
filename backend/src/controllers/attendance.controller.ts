import { Request, Response } from "express";
import attendanceService from "../services/attendance.service";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import auditLogService from "../services/auditLog.service";

class AttendanceController {

  getAllAttendances = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const attendances = await attendanceService.getAllAttendances(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(attendances,"Attendances fetched successfully")
      );
    }
  );

  getAttendanceById = asyncHandler(
    async (req: Request, res: Response) => {
      const attendance = await attendanceService.getAttendanceById(req.params.id as string);
      if (!attendance) {
        throw new AppError("Attendance not found",404);
      }
      return res.status(200).json(
        successResponse(attendance,"Attendance fetched successfully")
      );
    }
  );

  createAttendance = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const attendance = await attendanceService.createAttendance({...req.body,tenantId: user.tenantId,});
      await auditLogService.createLog(
        {
            userId: user.id,
            tenantId: user.tenantId,
        },
        {
            action: "CREATE",
            entity: "ATTENDANCE",
            entityId: attendance.id,
        }
      );
      return res.status(201).json(
        successResponse(attendance,"Attendance created successfully")
      );
    }
  );

  updateAttendance = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const attendance = await attendanceService.updateAttendance(req.params.id as string,req.body);
      await auditLogService.createLog(
        {
            userId: user.id,
            tenantId: user.tenantId,
        },
        {
            action: "UPDATE",
            entity: "ATTENDANCE",
            entityId: attendance.id,
        }
      );
      return res.status(200).json(
        successResponse(attendance,"Attendance updated successfully")
      );
    }
  );

  deleteAttendance = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      await attendanceService.deleteAttendance(req.params.id as string);
      await auditLogService.createLog(
        {
            userId: user.id,
            tenantId: user.tenantId,
        },
        {
            action: "DELETE",
            entity: "ATTENDANCE",
            entityId: req.params.id as string,
        }
      );
      return res.status(200).json(
        successResponse(null,"Attendance deleted successfully")
      );
    }
  );
}

export default new AttendanceController();