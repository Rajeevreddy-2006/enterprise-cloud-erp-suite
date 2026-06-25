import { Request, Response } from "express";
import resourceAllocationService from "../services/resourceAllocation.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class ResourceAllocationController {

  getAllAllocations = asyncHandler(
    async (req: Request,res: Response) => {
      const allocations = await resourceAllocationService.getAllAllocations();
      return res.status(200).json(
        successResponse(allocations,"Allocations fetched successfully")
      );
    }
  );

  getAllocationById = asyncHandler(
    async (req: Request,res: Response) => {
      const allocation = await resourceAllocationService.getAllocationById(req.params.id as string);
      return res.status(200).json(
        successResponse(allocation,"Allocation fetched successfully")
      );
    }
  );

  createAllocation = asyncHandler(
    async (req: Request,res: Response) => {
      const allocation = await resourceAllocationService.createAllocation(req.body);
      return res.status(201).json(
        successResponse(allocation,"Allocation created successfully")
      );
    }
  );

  updateAllocation = asyncHandler(
    async (req: Request,res: Response) => {
      const allocation = await resourceAllocationService.updateAllocation(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(allocation,"Allocation updated successfully")
      );
    }
  );

  deleteAllocation = asyncHandler(
    async (req: Request,res: Response) => {
      await resourceAllocationService.deleteAllocation(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Allocation deleted successfully")
      );
    }
  );
}

export default new ResourceAllocationController();