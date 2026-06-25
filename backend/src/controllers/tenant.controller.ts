import { Request, Response } from "express";
import tenantService from "../services/tenant.service";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class TenantController {

  getAllTenants = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const tenants = await tenantService.getAllTenants(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(tenants,"Tenants fetched successfully")
      );
    }
  );

  getTenantById = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const tenant = await tenantService.getTenantById(id);
      if (!tenant) {
        throw new AppError("Tenant not found",404);
      }
      return res.status(200).json(
        successResponse(tenant,"Tenant fetched successfully")
      );
    }
  );

  createTenant = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const tenant = await tenantService.createTenant({ ...req.body, tenantId: user.tenantId, });
      return res.status(201).json(
        successResponse(tenant,"Tenant created successfully")
      );
    }
  );

  updateTenant = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const tenant = await tenantService.updateTenant(id,req.body);
      return res.status(200).json(
        successResponse(tenant,"Tenant updated successfully")
      );
    }
  );

  deleteTenant = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      await tenantService.deleteTenant(id);
      return res.status(200).json(
        successResponse(null,"Tenant deleted successfully")
      );
    }
  );

}

export default new TenantController();