import { Request, Response } from "express";

import invoiceService from "../services/invoice.service";

import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class InvoiceController {

    getAllInvoices = asyncHandler(
        async (req: Request, res: Response) => {
            const user = (req as any).user;
            const invoices =
                await invoiceService.getAllInvoices(
                    user.tenantId
                );
            return res.status(200).json(
                successResponse(
                    invoices,
                    "Invoices fetched successfully"
                )
            );
        }
    );

    getInvoiceById = asyncHandler(
        async (req: Request, res: Response) => {
            const user = (req as any).user;
            const invoice =
                await invoiceService.getInvoiceById(
                    req.params.id as string,
                    user.tenantId
                );
            return res.status(200).json(
                successResponse(
                    invoice,
                    "Invoice fetched successfully"
                )
            );
        }
    );

    createInvoice = asyncHandler(
        async (req: Request, res: Response) => {
            const user = (req as any).user;
            const invoice =
                await invoiceService.createInvoice({
                    ...req.body,
                    invoiceNumber:
                        `INV-${new Date().getFullYear()}-${Date.now()}`,
                    dueDate:
                        req.body.dueDate,
                    tenantId:
                        user.tenantId,
                    status:
                        "DRAFT",
                });
            return res.status(201).json(
                successResponse(
                    invoice,
                    "Invoice created successfully"
                )
            );
        }
    );

    updateInvoice = asyncHandler(
        async (req: Request, res: Response) => {
            const user = (req as any).user;
            const invoice =
                await invoiceService.updateInvoice(
                    req.params.id as string,
                    user.tenantId,
                    req.body
                );
            return res.status(200).json(
                successResponse(
                    invoice,
                    "Invoice updated successfully"
                )
            );
        }
    );

    deleteInvoice = asyncHandler(
        async (req: Request, res: Response) => {
            const user = (req as any).user;
            await invoiceService.deleteInvoice(
                req.params.id as string,
                user.tenantId
            );
            return res.status(200).json(
                successResponse(
                    null,
                    "Invoice deleted successfully"
                )
            );
        }
    );

    // =====================================================
    // SEND EMAIL
    // =====================================================

    sendInvoice = asyncHandler(
        async (req: Request, res: Response) => {
            const user = (req as any).user;
            const result =
                await invoiceService.sendInvoice(
                    req.params.id as string,
                    user.tenantId
                );
            return res.status(200).json(
                successResponse(
                    result,
                    "Invoice sent successfully"
                )
            );
        }
    );

    // =====================================================
    // CUSTOMER REVIEW
    // =====================================================

    reviewInvoice = asyncHandler(
        async (req: Request, res: Response) => {
            const invoice =
                await invoiceService.reviewInvoice(
                    req.params.token as string
                );
            return res.status(200).json(
                successResponse(
                    invoice,
                    "Invoice fetched successfully"
                )
            );
        }
    );

    // =====================================================
    // CUSTOMER PAYMENT
    // =====================================================

    payInvoice = asyncHandler(
        async (req: Request, res: Response) => {
            const invoice =
                await invoiceService.payInvoice(
                    req.params.token as string
                );
            return res.status(200).json(
                successResponse(
                    invoice,
                    "Payment successful"
                )
            );
        }
    );

    // =====================================================
    // MANUAL OVERDUE
    // =====================================================

    markInvoiceOverdue = asyncHandler(
        async (req: Request, res: Response) => {
            const user = (req as any).user;
            const invoice =
                await invoiceService.markInvoiceOverdue(
                    req.params.id as string,
                    user.tenantId
                );
            return res.status(200).json(
                successResponse(
                    invoice,
                    "Invoice marked as overdue"
                )
            );
        }
    );

    failInvoice = asyncHandler(
      async (req, res) => {
          const invoice =
              await invoiceService.failInvoice(
                  req.params.token as string
              );
          return res.status(200).json(
              successResponse(
                  invoice,
                  "Invoice marked as failed"
              )
          );
      }
    );
}

export default new InvoiceController();