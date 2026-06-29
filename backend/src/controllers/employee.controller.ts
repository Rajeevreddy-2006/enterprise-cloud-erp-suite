import { Request, Response } from "express";
import employeeService from "../services/employee.service";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import auditLogService from "../services/auditLog.service";

class EmployeeController {

  getAllEmployees = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const employees = await employeeService.getAllEmployees(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(employees,"Employees fetched successfully")
      );
    }
  );

  getEmployeeById = asyncHandler(
    async ( req: Request, res: Response ) => {
      const id = req.params.id as string;
      const employee = await employeeService.getEmployeeById(id);
      if (!employee) {
        throw new AppError("Employee not found",404);
      }
      return res.status(200).json(
        successResponse(employee,"Employee fetched successfully")
      );
    }
  );

  createEmployee = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const employee = await employeeService.createEmployee({ ...req.body, tenantId: user.tenantId, });
      await auditLogService.createLog(
        {
            userId: user.id,
            tenantId: user.tenantId,
        },
        {
            action: "CREATE",
            entity: "EMPLOYEE",
            entityId: employee.id,
        }
      );
      return res.status(201).json(
        successResponse(employee,"Employee created successfully")
      );
    }
  );

  updateEmployee = asyncHandler(
    async (req: Request,res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      const employee = await employeeService.updateEmployee(id,req.body);
      await auditLogService.createLog(
        {
            userId: user.id,
            tenantId: user.tenantId,
        },
        {
            action: "UPDATE",
            entity: "EMPLOYEE",
            entityId: employee.id,
        }
      );
      return res.status(200).json(
        successResponse(employee,"Employee updated successfully")
      );
    }
  );

  deleteEmployee = asyncHandler(
    async (req: Request,res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      await employeeService.deleteEmployee(id);
      await auditLogService.createLog(
        {
            userId: user.id,
            tenantId: user.tenantId,
        },
        {
            action: "DELETE",
            entity: "EMPLOYEE",
            entityId: id,
        }
      );
      return res.status(200).json(
        successResponse(null,"Employee deleted successfully")
      );
    }
  );

}

export default new EmployeeController();