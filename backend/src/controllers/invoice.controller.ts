import { Request, Response } from "express";
import invoiceService from "../services/invoice.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class InvoiceController {

  getAllInvoices = asyncHandler(
    async (req: Request, res: Response) => {
      const invoices = await invoiceService.getAllInvoices();
      return res.status(200).json(
        successResponse(invoices,"Invoices fetched successfully")
      );
    }
  );

  getInvoiceById = asyncHandler(
    async (req: Request, res: Response) => {
      const invoice = await invoiceService.getInvoiceById(req.params.id as string);
      return res.status(200).json(
        successResponse(invoice,"Invoice fetched successfully")
      );
    }
  );

  createInvoice = asyncHandler(
    async (req: Request, res: Response) => {
      const invoice = await invoiceService.createInvoice(req.body);
      return res.status(201).json(
        successResponse(invoice,"Invoice created successfully")
      );
    }
  );

  updateInvoice = asyncHandler(
    async (req: Request, res: Response) => {
      const invoice = await invoiceService.updateInvoice(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(invoice,"Invoice updated successfully")
      );
    }
  );

  deleteInvoice = asyncHandler(
    async (req: Request, res: Response) => {
      await invoiceService.deleteInvoice(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Invoice deleted successfully")
      );
    }
  );
}

export default new InvoiceController();