import { Prisma } from "../generated/prisma/client";
import payrollRepository from "../repositories/payroll.repository";
import { CreatePayrollDto, PayrollCreateData, UpdatePayrollDto, } from "../types/payroll.types";
import { RoleType } from "../generated/prisma/enums";
import AppError from "../utils/AppError";
import auditLogService from "./auditLog.service";
import notificationService from "./notification.service";
import transactionRepository from "../repositories/transaction.repository";
import { buildPayslip, } from "../utils/payslip";
// import { generatePayslipPdf } from "../utils/pdfGenerator"
import { generatePayrollPdf } from "../utils/pdfGenerator";
import emailService from "./email.service";
import { payrollGeneratedTemplate } from "../templates/payrollGenerated.template";
import { payrollPaidTemplate } from "../templates/payrollPaid.template";
import { safeSendEmail } from "../utils/safeEmail";
import workflowService from "./workflow.service";
import { calculatePayroll } from "../utils/payrollCalculator";
import { getWorkingDays } from "../utils/workingDays";


class PayrollService {

  async getAllPayrolls(tenantId: string,role: RoleType) {
    return payrollRepository.getAllPayrolls(tenantId,role);
  }

  async getPayrollById(id: string) {
    return payrollRepository.getPayrollById(id);
  }

  async generatePayslip(id: string) {
    const payroll = await payrollRepository.getPayrollWithDetails(id);
    if (!payroll) {
        throw new AppError("Payroll not found",404);
    }
    return buildPayslip(payroll);
  }

  // async generatePayslipPdf(payrollId: string) {
  //   const payroll = await payrollRepository.getPayrollWithDetails(payrollId);
  //   if (!payroll) {
  //       throw new AppError("Payroll not found",404);
  //   }
  //   return generatePayslipPdf(payroll);
  // }
  async generatePayslipPdf(

    payrollId:string

){

    const payroll =

        await payrollRepository

            .getPayrollWithDetails(

                payrollId

            );

    if(

        !payroll

    ){

        throw new AppError(

            "Payroll not found",

            404

        );

    }

    return generatePayrollPdf(

        payroll

    );

}

  async employeePayrolls(employeeId:string){
    return payrollRepository
      .employeePayrolls(employeeId);
  }

  async getPayroll(id:string){
    return payrollRepository
      .getPayrollById(id);
  }

  async processPayroll(id: string,user: any) {
    const payroll = await payrollRepository.getPayrollById(id);
    if (!payroll) {
      throw new AppError(
        "Payroll not found",
        404
      );
    }
    if (user.role !== "SUPER_ADMIN") {
      throw new AppError(
        "Only SUPER_ADMIN can process payroll",
        403
      );
    }
    if (payroll.status !== "PENDING") {
      throw new AppError(
        "Payroll already processed",
        400
      );
    }
    return payrollRepository.updatePayroll(
      id,
      {
        status: "PROCESSED"
      }
    );
  }

  async getPayrollSummary(

    employeeId: string,

    month: number,

    year: number

) {

    const existing =

        await payrollRepository
            .getPayrollByEmployeeMonth(

                employeeId,

                month,

                year

            );

    if (existing) {

        return {

            grossSalary:

                existing.grossSalary,

            deductions:

                existing.deductions,

            netSalary:

                existing.netSalary,

            status:

                existing.status

        };

    }

    const salaryStructure =

        await payrollRepository
            .getSalaryStructureByEmployeeId(

                employeeId

            );

    if (!salaryStructure) {

        throw new AppError(

            "Salary structure not found",

            404

        );

    }

    const attendances =

        await payrollRepository
            .getAttendancesForMonth(

                employeeId,

                month,

                year

            );

    const approvedLeaves =

        await payrollRepository
            .getApprovedLeavesForMonth(

                employeeId,

                month,

                year

            );

    return calculatePayroll(

        salaryStructure,

        attendances,

        approvedLeaves,

        month,

        year

    );

}

  // async markAsPaid(id: string) {
  //   const payroll = await payrollRepository.getPayrollById(id);
  //   if (!payroll) {
  //       throw new AppError("Payroll not found",404);
  //   }
  //   if (payroll.status === "PAID") {
  //       throw new AppError("Payroll already paid",400);
  //   }
  //   const salaryExpenseAccount = await payrollRepository.getAccountByName(payroll.tenantId,"Salary Expense");
  //   const companyBankAccount = await payrollRepository.getAccountByName(payroll.tenantId,"Company Bank");
  //   if (!salaryExpenseAccount) {
  //       throw new AppError("Salary Expense account not found",404);
  //   }
  //   if (!companyBankAccount) {
  //       throw new AppError("Company Bank account not found",404);
  //   }
  //   // Create Finance Transaction
  //   const financeTransaction = await transactionRepository.createTransaction({
  //       description: `Payroll ${payroll.month}/${payroll.year}`,
  //       amount: Number(payroll.netSalary),
  //       type: "DEBIT",
  //       accountId: salaryExpenseAccount.id,
  //       tenantId: payroll.tenantId,
  //   });
  //   // Create Journal Entry
  //   await transactionRepository.createJournalEntry({
  //       amount: payroll.netSalary,
  //       debitAccountId: salaryExpenseAccount.id,
  //       creditAccountId: companyBankAccount.id,
  //       transactionId: financeTransaction.id,
  //       tenantId: payroll.tenantId,
  //   });
  //   // Update Salary Expense Balance
  //   // EXPENSE account increases on DEBIT
  //   await transactionRepository.updateAccountBalance(
  //       salaryExpenseAccount.id,
  //       salaryExpenseAccount.balance.plus(payroll.netSalary)
  //   );
  //   // Update Company Bank Balance
  //   // ASSET account decreases on CREDIT
  //   await transactionRepository.updateAccountBalance(
  //       companyBankAccount.id,
  //       companyBankAccount.balance.minus(payroll.netSalary)
  //   );
  //   // Notification
  //   await notificationService.createNotification({
  //       title: "Payroll Paid",
  //       message: `Payroll paid for ${payroll.month}/${payroll.year}`,
  //       tenantId: payroll.tenantId,
  //   });
  //   // Update Payroll Status LAST
  //   const updatedPayroll = await payrollRepository.updatePayroll(id,{ status: "PAID", });
  //   await safeSendEmail(payroll.employee.email,"Salary Credited",
  //       payrollPaidTemplate(`${payroll.employee.firstName} ${payroll.employee.lastName}`,payroll.month,payroll.year)
  //   );
  //   return updatedPayroll;
  // }
  async markAsPaid(id: string) {

    const payroll = await payrollRepository.getPayrollById(id);

    if (!payroll) {
        throw new AppError("Payroll not found", 404);
    }

    if (payroll.status === "PAID") {
        throw new AppError("Payroll already paid", 400);
    }

    // Update Payroll Status
    const updatedPayroll = await payrollRepository.updatePayroll(
        id,
        {
            status: "PAID",
        }
    );

    // Notification
    await notificationService.createNotification({
        title: "Payroll Paid",
        message: `Payroll paid for ${payroll.month}/${payroll.year}`,
        tenantId: payroll.tenantId,
    });

    // Email
    await safeSendEmail(
        payroll.employee.email,
        "Salary Credited",
        payrollPaidTemplate(
            `${payroll.employee.firstName} ${payroll.employee.lastName}`,
            payroll.month,
            payroll.year
        )
    );

    return updatedPayroll;
}

  async createPayroll(data: CreatePayrollDto) {
    // Check Employee
    const employee = await payrollRepository.getEmployeeById(data.employeeId);
    if (!employee) {
      throw new AppError("Employee not found",404);
    }
    // Check Salary Structure
    const salaryStructure = await payrollRepository.getSalaryStructureByEmployeeId(data.employeeId);
    if (!salaryStructure) {
      throw new AppError("Salary structure not found",404);
    }
    const attendances = await payrollRepository.getAttendancesForMonth(data.employeeId,data.month,data.year);
    const approvedLeaves = await payrollRepository.getApprovedLeavesForMonth(data.employeeId,data.month,data.year);
    // Prevent Duplicate Payroll
    const existingPayroll = await payrollRepository.getPayrollByEmployeeMonth(data.employeeId,data.month,data.year);
    if (existingPayroll) {
      throw new AppError("Payroll already generated for this month",400);
    }
    // Calculate Gross
    const basicSalary = new Prisma.Decimal(salaryStructure.basicSalary);
    const hra = new Prisma.Decimal(salaryStructure.hra);
    const bonus = new Prisma.Decimal(salaryStructure.bonus);
    const grossSalary = basicSalary.plus(hra).plus(bonus);
    const workingDays = getWorkingDays(data.month,data.year);
    const absentDays = attendances.filter( attendance => attendance.status === "ABSENT" ).length;
    let unpaidLeaveDays = 0;
    for (const leave of approvedLeaves) {
        if (leave.leaveType !== "UNPAID") { continue; }
        const days =
            Math.ceil(
            (
                leave.endDate.getTime() -
                leave.startDate.getTime()
            ) /
            (1000 * 60 * 60 * 24)
            ) + 1;
        unpaidLeaveDays += days;
    }
    const perDaySalary = grossSalary.div(workingDays);
    const attendanceDeduction = perDaySalary.mul(absentDays + unpaidLeaveDays);
    // PF
    const pfDeduction = grossSalary.mul(salaryStructure.pfPercentage).div(100);
    // Tax
    const taxDeduction = grossSalary.mul(salaryStructure.taxPercentage).div(100);
    // Total Deductions
    const deductions = pfDeduction.plus(taxDeduction).plus(attendanceDeduction);
    // Net Salary
    const netSalary = grossSalary.minus(deductions);
    const payrollData: PayrollCreateData = {
      employeeId: data.employeeId,
      tenantId: data.tenantId,
      month: data.month,
      year: data.year,
      grossSalary,
      deductions,
      netSalary,
      status: "PENDING",
    };
    const payroll = await payrollRepository.createPayroll(payrollData);
    // await notificationService.createNotification({
    //     title: "Payroll Generated",
    //     message: `Payroll generated for ${employee.firstName} ${employee.lastName}`,
    //     tenantId: payroll.tenantId,
    // });
    // await auditLogService.createLog({
    //     action: "CREATE",
    //     entity: "PAYROLL",
    //     entityId: payroll.id,
    //     userId: "SYSTEM", // temporary
    //     tenantId: payroll.tenantId,
    // });
    await safeSendEmail(employee.email,"Payroll Generated",
        payrollGeneratedTemplate(`${employee.firstName} ${employee.lastName}`,data.month,data.year)
    );
    await workflowService.onPayrollGenerated(`${employee.firstName} ${employee.lastName}`,payroll.tenantId);
    return payroll;
  }

  async updatePayroll(id: string,data: UpdatePayrollDto) {
    const payroll = await payrollRepository.getPayrollById(id);
    if (!payroll) {
      throw new AppError("Payroll not found",404);
    }
    return payrollRepository.updatePayroll(id,data);
  }

  async deletePayroll(id: string) {
    const payroll = await payrollRepository.getPayrollById(id);
    if (!payroll) {
      throw new AppError("Payroll not found",404);
    }
    return payrollRepository.deletePayroll(id);
  }
}

export default new PayrollService();