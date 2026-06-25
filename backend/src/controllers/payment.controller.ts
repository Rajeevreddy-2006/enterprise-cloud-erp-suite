import { Request, Response } from "express";
import paymentService from "../services/payment.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class PaymentController {

  getAllPayments = asyncHandler(
    async (req: Request, res: Response) => {
      const payments = await paymentService.getAllPayments();
      return res.status(200).json(
        successResponse(payments,"Payments fetched successfully")
      );
    }
  );

  getPaymentById = asyncHandler(
    async (req: Request, res: Response) => {
      const payment = await paymentService.getPaymentById(req.params.id as string);
      return res.status(200).json(
        successResponse(payment,"Payment fetched successfully")
      );
    }
  );

  createPayment = asyncHandler(
    async (req: Request, res: Response) => {
      const payment = await paymentService.createPayment(req.body);
      return res.status(201).json(
        successResponse(payment,"Payment created successfully")
      );
    }
  );

  updatePayment = asyncHandler(
    async (req: Request, res: Response) => {
      const payment = await paymentService.updatePayment(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(payment,"Payment updated successfully")
      );
    }
  );

  deletePayment = asyncHandler(
    async (req: Request, res: Response) => {
      await paymentService.deletePayment(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Payment deleted successfully")
      );
    }
  );
}

export default new PaymentController();