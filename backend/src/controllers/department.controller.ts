import { Request, Response } from "express";
import departmentService from "../services/department.service";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import auditLogService from "../services/auditLog.service";

class DepartmentController {

  getAllDepartments = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const departments = await departmentService.getAllDepartments(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(departments,"Departments fetched successfully")
      );
    }
  );

  getDepartmentById = asyncHandler(
    async ( req: Request, res: Response ) => {
      const id = req.params.id as string;
      const department = await departmentService.getDepartmentById(id);
      if (!department) {
        throw new AppError("Employee not found",404);
      }
      return res.status(200).json(
        successResponse(department,"Department fetched successfully")
      );
    }
  );

  createDepartment = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const department = await departmentService.createDepartment({ ...req.body, tenantId: user.tenantId, });
      await auditLogService.createLog(
        {
            userId: user.id,
            tenantId: user.tenantId,
        },
        {
            action: "CREATE",
            entity: "DEPARTMENT",
            entityId: department.id,
        }
      );
      return res.status(201).json(
        successResponse(department,"Department created successfully")
      );
    }
  );

  updateDepartment= asyncHandler(
    async (req: Request,res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      const department = await departmentService.updateDepartment(id,req.body);
      await auditLogService.createLog(
        {
            userId: user.id,
            tenantId: user.tenantId,
        },
        {
            action: "UPDATE",
            entity: "DEPARTMENT",
            entityId: department.id,
        }
      );
      return res.status(200).json(
        successResponse(department,"Department updated successfully")
      );
    }
  );

  deleteDepartment = asyncHandler(
    async (req: Request,res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      await departmentService.deleteDepartment(id);
      await auditLogService.createLog(
        {
            userId: user.id,
            tenantId: user.tenantId,
        },
        {
            action: "DELETE",
            entity: "DEPARTMENT",
            entityId: id,
        }
      );
      return res.status(200).json(
        successResponse(null,"Department deleted successfully")
      );
    }
  );

}

export default new DepartmentController();