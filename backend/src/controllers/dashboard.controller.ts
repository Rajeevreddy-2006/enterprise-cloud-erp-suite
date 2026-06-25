import { Request, Response } from "express";
import dashboardService from "../services/dashboard.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class DashboardController {

  getSummary = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const summary = await dashboardService.getSummary(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(summary,"Dashboard summary fetched successfully")
      );
    }
  );

  getPayrollTrend = asyncHandler(
    async (req: Request,res: Response) => {
        const user = (req as any).user;
        const data = await dashboardService.getPayrollTrend(user.tenantId,user.role);
        return res.status(200).json(
            successResponse(data,"Payroll trend fetched successfully")
        );
    }
  );

  getDepartmentAnalytics = asyncHandler(
    async (req: Request,res: Response) => {
        const user = (req as any).user;
        const data = await dashboardService.getDepartmentAnalytics(user.tenantId,user.role);
        return res.status(200).json(
            successResponse(data,"Department analytics fetched successfully")
        );
    }
  );

  getInventoryAnalytics = asyncHandler(
    async (req: Request,res: Response) => {
        const user = (req as any).user;
        const data = await dashboardService.getInventoryAnalytics(user.tenantId,user.role);
        return res.status(200).json(
            successResponse(data,"Inventory analytics fetched successfully")
        );
    }
  );

  getRoleDashboard = asyncHandler(
    async (req: Request,res: Response) => {
        const user = (req as any).user;
        const dashboard = await dashboardService.getRoleDashboard(user.tenantId,user.role);
        return res.status(200).json(
            successResponse(dashboard,"Dashboard fetched successfully")
        );
    }
  );
}

export default new DashboardController();
