import { Request, Response } from "express";
import reportService from "../services/report.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class ReportController {

  getFinancialSummary = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const summary = await reportService.getFinancialSummary(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(summary,"Financial summary fetched successfully")
      );
    }
  );

  getInventorySummary = asyncHandler(
    async (req: Request, res: Response) => {
        const user = (req as any).user;
      const summary = await reportService.getInventorySummary(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(summary,"Inventory summary fetched successfully")
      );
    }
  );

  getEmployeeSummary = asyncHandler(
    async (req: Request, res: Response) => {
        const user = (req as any).user;
      const summary = await reportService.getEmployeeSummary(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(summary,"Employee summary fetched successfully")
      );
    }
  );

  employeePdf = asyncHandler(
    async (req: Request,res: Response) => {
        const user = (req as any).user;
        const pdf = await reportService.employeePdf(user.tenantId,user.role);
        res.setHeader("Content-Type","application/pdf");
        res.setHeader("Content-Disposition","attachment; filename=employees.pdf");
        res.send(pdf);
    }
  );

  payrollPdf = asyncHandler(
    async (req: Request,res: Response) => {
        const user = (req as any).user;
        const pdf = await reportService.payrollPdf(user.tenantId,user.role);
        res.setHeader("Content-Type","application/pdf");
        res.setHeader("Content-Disposition","attachment; filename=payrolls.pdf");
        res.send(pdf);
    }
  );

  inventoryPdf = asyncHandler(
    async (req: Request,res: Response) => {
        const user = (req as any).user;
        const pdf = await reportService.inventoryPdf(user.tenantId,user.role);
        res.setHeader("Content-Type","application/pdf");
        res.setHeader("Content-Disposition","attachment; filename=inventory.pdf");
        res.send(pdf);
    }
  );

  employeeExcel = asyncHandler(
    async (req: Request,res: Response) => {
        const user = (req as any).user;
        const excel = await reportService.employeeExcel(user.tenantId,user.role);
        res.setHeader("Content-Type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition","attachment; filename=employees.xlsx");
        res.send(excel);
    }
  );

  payrollExcel = asyncHandler(
    async (req: Request,res: Response) => {
        const user = (req as any).user;
        const excel = await reportService.payrollExcel(user.tenantId,user.role);
        res.setHeader("Content-Type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition","attachment; filename=payrolls.xlsx");
        res.send(excel);
    }
  );

  inventoryExcel = asyncHandler(
    async (req: Request,res: Response) => {
        const user = (req as any).user;
        const excel = await reportService.inventoryExcel(user.tenantId,user.role);
        res.setHeader("Content-Type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition","attachment; filename=inventory.xlsx");
        res.send(excel);
    }
  );
}

export default new ReportController();