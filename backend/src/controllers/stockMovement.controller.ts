import { Request, Response } from "express";
import stockMovementService from "../services/stockMovement.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class StockMovementController {

  getAllMovements = asyncHandler(
    async (req: Request, res: Response) => {
      const movements = await stockMovementService.getAllMovements();
      return res.status(200).json(
        successResponse(movements,"Stock movements fetched successfully")
      );
    }
  );

  getMovementById = asyncHandler(
    async (req: Request, res: Response) => {
      const movement = await stockMovementService.getMovementById(req.params.id as string);
      return res.status(200).json(
        successResponse(movement,"Stock movement fetched successfully")
      );
    }
  );

  createMovement = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const movement = await stockMovementService.createMovement({ ...req.body, tenantId: user.tenantId, });
      return res.status(201).json(
        successResponse(movement,"Stock movement created successfully")
      );
    }
  );

  deleteMovement = asyncHandler(
    async (req: Request, res: Response) => {
      await stockMovementService.deleteMovement(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Stock movement deleted successfully")
      );
    }
  );
}

export default new StockMovementController();