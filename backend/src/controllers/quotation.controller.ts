import { Request, Response } from "express";
import quotationService from "../services/quotation.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class QuotationController {

  getAllQuotations = asyncHandler(
    async (req: Request,res: Response) => {
      const quotations = await quotationService.getAllQuotations();
      return res.status(200).json(
        successResponse(quotations,"Quotations fetched successfully")
      );
    }
  );

  getQuotationById = asyncHandler(
    async (req: Request,res: Response) => {
      const quotation = await quotationService.getQuotationById(req.params.id as string);
      return res.status(200).json(
        successResponse(quotation,"Quotation fetched successfully")
      );
    }
  );

  createQuotation = asyncHandler(
    async (req: Request,res: Response) => {
      const quotation = await quotationService.createQuotation(req.body);
      return res.status(201).json(
        successResponse(quotation,"Quotation created successfully")
      );
    }
  );

  updateQuotation = asyncHandler(
    async (req: Request,res: Response) => {
      const quotation = await quotationService.updateQuotation(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(quotation,"Quotation updated successfully")
      );
    }
  );

  deleteQuotation = asyncHandler(
    async (req: Request,res: Response) => {
      await quotationService.deleteQuotation(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Quotation deleted successfully")
      );
    }
  );
}

export default new QuotationController();