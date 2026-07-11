import { Request, Response } from "express";
import quotationService from "../services/quotation.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class QuotationController {

    getAllQuotations = asyncHandler(
        async (req: Request, res: Response) => {

            const user = (req as any).user;

            const quotations =
                await quotationService.getAllQuotations(
                    user.tenantId
                );

            return res.status(200).json(
                successResponse(
                    quotations,
                    "Quotations fetched successfully"
                )
            );
        }
    );

    getQuotationById = asyncHandler(
        async (req: Request, res: Response) => {

            const user = (req as any).user;

            const quotation =
                await quotationService.getQuotationById(
                    req.params.id as string,
                    user.tenantId
                );

            return res.status(200).json(
                successResponse(
                    quotation,
                    "Quotation fetched successfully"
                )
            );
        }
    );

    createQuotation = asyncHandler(
        async (req: Request, res: Response) => {

            const user = (req as any).user;

            const quotationNumber =
                `QT-${new Date().getFullYear()}-${Date.now()}`;

            const quotation =
                await quotationService.createQuotation({
                    ...req.body,
                    quotationNumber,
                    tenantId: user.tenantId,
                    validUntil: new Date(req.body.validUntil),
                });

            return res.status(201).json(
                successResponse(
                    quotation,
                    "Quotation created successfully"
                )
            );
        }
    );

    updateQuotation = asyncHandler(
        async (req: Request, res: Response) => {

            const user = (req as any).user;

            const quotation =
                await quotationService.updateQuotation(
                    req.params.id as string,
                    user.tenantId,
                    {
                        ...req.body,
                        validUntil: req.body.validUntil
                            ? new Date(req.body.validUntil)
                            : undefined,
                    }
                );

            return res.status(200).json(
                successResponse(
                    quotation,
                    "Quotation updated successfully"
                )
            );
        }
    );

    deleteQuotation = asyncHandler(
        async (req: Request, res: Response) => {

            const user = (req as any).user;

            await quotationService.deleteQuotation(
                req.params.id as string,
                user.tenantId
            );

            return res.status(200).json(
                successResponse(
                    null,
                    "Quotation deleted successfully"
                )
            );
        }
    );

    sendQuotation = asyncHandler(
        async (req: Request, res: Response) => {

            const user = (req as any).user;

            const result =
                await quotationService.sendQuotation(
                    req.params.id as string,
                    user.tenantId
                );

            return res.status(200).json(
                successResponse(
                    result,
                    "Quotation sent successfully"
                )
            );
        }
    );

    reviewQuotation = asyncHandler(
        async (req: Request, res: Response) => {

            const quotation =
                await quotationService.reviewQuotation(
                    req.params.token as string
                );

            return res.status(200).json(
                successResponse(
                    quotation,
                    "Quotation fetched successfully"
                )
            );
        }
    );

  acceptQuotation = asyncHandler(
    async (req: Request, res: Response) => {

      const quotation =
        await quotationService.acceptQuotation(
          req.params.token as string,
          req.body.requestedQuantity
        );

      return res.status(200).json(
        successResponse(
          quotation,
          "Quotation accepted successfully"
        )
      );
    }
  );

    rejectQuotation = asyncHandler(
        async (req: Request, res: Response) => {

            const quotation =
                await quotationService.rejectQuotation(
                    req.params.token as string
                );

            return res.status(200).json(
                successResponse(
                    quotation,
                    "Quotation rejected successfully"
                )
            );
        }
    );

}

export default new QuotationController();