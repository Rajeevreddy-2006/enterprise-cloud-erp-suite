import { Request, Response } from "express";
import payrollService from "../services/payroll.service";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class PayrollController {

  getAllPayrolls = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const payrolls = await payrollService.getAllPayrolls(user.tenantId,user.role);
      return res.status(200).json(
        successResponse(payrolls,"Payrolls fetched successfully")
      );
    }
  );

  generatePayslip = asyncHandler(
    async (req: Request, res: Response) => {
        const payroll = await payrollService.generatePayslip(req.params.id as string);
        return res.status(200).json(
            successResponse(payroll,"Payslip generated successfully")
        );
    }
  );

  downloadPayslip = asyncHandler(
    async (req: Request,res: Response) => {
        const pdf = await payrollService.generatePayslipPdf(req.params.id as string);
        res.setHeader("Content-Type","application/pdf");
        res.setHeader("Content-Disposition",`attachment; filename=payslip-${req.params.id}.pdf`);
        res.send(pdf);
    }
  );

  getPayrollById = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const payroll = await payrollService.getPayrollById(id);
      if (!payroll) {
        throw new AppError("Payroll not found",404);
      }
      return res.status(200).json(
        successResponse(payroll,"Payroll fetched successfully")
      );
    }
  );

  createPayroll = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const payroll = await payrollService.createPayroll({...req.body,tenantId: user.tenantId,});
      return res.status(201).json(
        successResponse(payroll,"Payroll generated successfully")
      );
    }
  );

  updatePayroll = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const payroll = await payrollService.updatePayroll(id,req.body);
      return res.status(200).json(
        successResponse(payroll,"Payroll updated successfully")
      );
    }
  );

  markAsPaid = asyncHandler(
    async (req: Request, res: Response) => {
        const payroll = await payrollService.markAsPaid(req.params.id as string);
        return res.status(200).json(
            successResponse(payroll,"Payroll paid successfully")
        );
    }
  );

  deletePayroll = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      await payrollService.deletePayroll(id);
      return res.status(200).json(
        successResponse(null,"Payroll deleted successfully")
      );
    }
  );

}

export default new PayrollController();