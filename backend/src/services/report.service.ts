import reportRepository from "../repositories/report.repository";
import { RoleType } from "../generated/prisma/enums";
import { generateEmployeeReportPdf, generatePayrollReportPdf, generateInventoryReportPdf, } from "../utils/pdfGenerator";
import { generateEmployeeExcel, generatePayrollExcel, generateInventoryExcel, } from "../utils/excelGenerator";

class ReportService {

  async getFinancialSummary(tenantId: string,role: RoleType) {
    return reportRepository.getFinancialSummary(tenantId,role);
  }

  async getInventorySummary(tenantId: string,role: RoleType) {
    return reportRepository.getInventorySummary(tenantId,role);
  }

  async getEmployeeSummary(tenantId: string,role: RoleType) {
    return reportRepository.getEmployeeSummary(tenantId,role);
  }

  async employeePdf(tenantId: string,role: RoleType) {
    const employees = await reportRepository.getEmployees(tenantId,role);
    return generateEmployeeReportPdf(employees);
  }

  async payrollPdf(tenantId: string,role: RoleType) {
    const payrolls = await reportRepository.getPayrolls(tenantId,role);
    return generatePayrollReportPdf(payrolls);
  }

  async inventoryPdf(tenantId: string,role: RoleType) {
    const items = await reportRepository.getInventoryItems(tenantId,role);
    return generateInventoryReportPdf(items);
  }

  async employeeExcel(tenantId: string,role: RoleType) {
    const employees = await reportRepository.getEmployees(tenantId,role);
    return generateEmployeeExcel(employees);
  }

  async payrollExcel(tenantId: string,role: RoleType) {
    const payrolls = await reportRepository.getPayrolls(tenantId,role);
    return generatePayrollExcel(payrolls);
  }

  async inventoryExcel(tenantId: string,role: RoleType) {
    const items = await reportRepository.getInventoryItems(tenantId,role);
    return generateInventoryExcel(items);
  }
}

export default new ReportService();