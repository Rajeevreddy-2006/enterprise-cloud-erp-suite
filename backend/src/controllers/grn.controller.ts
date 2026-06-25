import { Request, Response, } from "express";
import grnService from "../services/grn.service";
import { successResponse, } from "../utils/apiResponse";
import { asyncHandler, } from "../utils/asyncHandler";

class GRNController {

  getAllGRNs = asyncHandler(
    async (req: Request,res: Response) => {
      const grns = await grnService.getAllGRNs();
      return res.status(200).json(
        successResponse(grns,"GRNs fetched successfully")
      );
    }
  );

  getGRNById = asyncHandler(
    async (req: Request,res: Response) => {
      const grn = await grnService.getGRNById(req.params.id as string);
      return res.status(200).json(
        successResponse(grn,"GRN fetched successfully")
      );
    }
  );

  createGRN = asyncHandler(
    async (req: Request,res: Response) => {
      const user = (req as any).user;
      const grn = await grnService.createGRN({...req.body,tenantId:user.tenantId,});
      return res.status(201).json(
        successResponse(grn,"GRN created successfully")
      );
    }
  );

  updateGRN = asyncHandler(
    async (req: Request,res: Response) => {
      const grn = await grnService.updateGRN(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(grn,"GRN updated successfully")
      );
    }
  );

  deleteGRN = asyncHandler(
    async (req: Request,res: Response) => {
      await grnService.deleteGRN(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"GRN deleted successfully")
      );
    }
  );
}

export default new GRNController();