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

  completePayment = asyncHandler(
    async (req: Request, res: Response) => {
      const payment =
        await paymentService.completePayment(
          req.params.id as string
        );
      return res.status(200).json(
        successResponse(
          payment,
          "Payment completed successfully"
        )
      );
    }
  );

  failPayment = asyncHandler(
    async (req: Request, res: Response) => {
      const payment =
        await paymentService.failPayment(
          req.params.id as string
        );
      return res.status(200).json(
        successResponse(
          payment,
          "Payment marked as failed"
        )
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
        const user = (req as any).user;
        const paymentNumber =
            `PAY-${Date.now()}`;
        const payment =
            await paymentService.createPayment({
                ...req.body,
                paymentNumber,
                tenantId: user.tenantId,
                status: "PENDING",
                paymentDate: new Date(req.body.paymentDate)
            });
        return res.status(201).json(
            successResponse(
                payment,
                "Payment created successfully"
            )
        );
    }
  );

  updatePayment = asyncHandler(
    async (req: Request, res: Response) => {
        const payment =
            await paymentService.updatePayment(
                req.params.id as string,
                {
                    ...req.body,
                    ...(req.body.paymentDate && {
                        paymentDate: new Date(req.body.paymentDate)
                    })
                }
            );
        return res.status(200).json(
            successResponse(
                payment,
                "Payment updated successfully"
            )
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