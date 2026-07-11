import { Request, Response } from "express";
import salaryStructureService from "../services/salaryStructure.service";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class SalaryStructureController {

  getAllSalaryStructures = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const salaryStructures = await salaryStructureService.getAllSalaryStructures(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(salaryStructures,"Salary structures fetched successfully")
      );
    }
  );

  getSalaryStructureById = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const salaryStructure = await salaryStructureService.getSalaryStructureById(id);
      if (!salaryStructure) {
        throw new AppError("Salary structure not found",404);
      }
      return res.status(200).json(
        successResponse(salaryStructure,"Salary structure fetched successfully")
      );
    }
  );

  createSalaryStructure = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const payload = { ...req.body, tenantId: user.tenantId };
      console.log(payload);
      const salaryStructure = await salaryStructureService.createSalaryStructure(payload);
      return res.status(201).json(
        successResponse(salaryStructure,"Salary structure created successfully")
      );
    }
  );

  updateSalaryStructure = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const salaryStructure = await salaryStructureService.updateSalaryStructure(id,req.body);
      return res.status(200).json(
        successResponse(salaryStructure,"Salary structure updated successfully")
      );
    }
  );

  deleteSalaryStructure = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      await salaryStructureService.deleteSalaryStructure(id);
      return res.status(200).json(
        successResponse(null,"Salary structure deleted successfully")
      );
    }
  );

}

export default new SalaryStructureController();