import { Request, Response } from "express";
import supplierService from "../services/supplier.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class SupplierController {

  getAllSuppliers = asyncHandler(
    async (req: Request, res: Response) => {
      const suppliers = await supplierService.getAllSuppliers();
      return res.status(200).json(
        successResponse(suppliers,"Suppliers fetched successfully")
      );
    }
  );

  getSupplierById = asyncHandler(
    async (req: Request, res: Response) => {
      const supplier = await supplierService.getSupplierById(req.params.id as string);
      return res.status(200).json(
        successResponse(supplier,"Supplier fetched successfully")
      );
    }
  );

  getSupplierAnalytics = asyncHandler(
    async (req: Request,res: Response) => {
      const analytics = await supplierService.getSupplierAnalytics(req.params.id as string);
      return res.status(200).json(
        successResponse(analytics,"Supplier analytics fetched successfully")
      );
    }
  );

  createSupplier = asyncHandler(
    async (req: Request, res: Response) => {
      const supplier = await supplierService.createSupplier(req.body);
      return res.status(201).json(
        successResponse(supplier,"Supplier created successfully")
      );
    }
  );

  updateSupplier = asyncHandler(
    async (req: Request, res: Response) => {
      const supplier = await supplierService.updateSupplier(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(supplier,"Supplier updated successfully")
      );
    }
  );

  deleteSupplier = asyncHandler(
    async (req: Request, res: Response) => {
      await supplierService.deleteSupplier(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Supplier deleted successfully")
      );
    }
  );
}

export default new SupplierController();