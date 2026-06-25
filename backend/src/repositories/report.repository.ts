import prisma from "../config/database";
import { RoleType } from "../generated/prisma/enums";

class ReportRepository {

  async getFinancialSummary(tenantId: string,role: RoleType) {
    const whereClause = role === "SUPER_ADMIN"? {}: { tenantId };
    const accounts = await prisma.account.findMany({where: whereClause,});

    let assetBalance = 0;
    let liabilityBalance = 0;
    let equityBalance = 0;
    let revenueBalance = 0;
    let expenseBalance = 0;

    for (const account of accounts) {
      const balance = Number(account.balance);
      switch (account.type) {
        case "ASSET":
          assetBalance += balance;
          break;
        case "LIABILITY":
          liabilityBalance += balance;
          break;
        case "EQUITY":
          equityBalance += balance;
          break;
        case "REVENUE":
          revenueBalance += balance;
          break;
        case "EXPENSE":
          expenseBalance += balance;
          break;
      }
    }
    return {
      totalAccounts: accounts.length,
      assetBalance,
      liabilityBalance,
      equityBalance,
      revenueBalance,
      expenseBalance,
      profit:revenueBalance - expenseBalance,
    };
  }

  async getInventorySummary(tenantId: string,role: RoleType) {
    const whereClause = role === "SUPER_ADMIN"? {}: { tenantId };
    const items = await prisma.inventoryItem.findMany({where: whereClause,});

    let totalStock = 0;
    let inventoryValue = 0;

    for (const item of items) {
      totalStock += item.quantity;
      inventoryValue += item.quantity * Number(item.unitPrice);
    }
    return {
      totalItems: items.length,
      totalStock,
      inventoryValue,
    };
  }

  async getEmployeeSummary(tenantId: string,role: RoleType) {
    const employeeWhere = role === "SUPER_ADMIN"? {}: { tenantId };
    const departmentWhere = role === "SUPER_ADMIN"? {}: { tenantId };
    const totalEmployees = await prisma.employee.count({where: employeeWhere,});
    const totalDepartments = await prisma.department.count({where: departmentWhere,});
    const departments = await prisma.department.findMany({
        where: departmentWhere,
        include: { employees: true, },
    });
    return {
      totalEmployees,
      totalDepartments,

      employeesByDepartment:
        departments.map((dept) => ({
          department: dept.name,
          count: dept.employees.length,
        })),
    };
  }

  async getEmployees(tenantId: string,role: RoleType) {
    return prisma.employee.findMany({
        where: role === "SUPER_ADMIN"? {}: { tenantId },
        include: { department: true, },
        orderBy: { createdAt: "desc", },
    });
  }

  async getPayrolls(tenantId: string,role: RoleType) {
    return prisma.payroll.findMany({
        where: role === "SUPER_ADMIN"? {}: { tenantId },
        include: { employee: true, },
        orderBy: { createdAt: "desc", },
    });
  }
  
  async getInventoryItems(tenantId: string,role: RoleType) {
    return prisma.inventoryItem.findMany({
        where: role === "SUPER_ADMIN"? {}: { tenantId },
        orderBy: { createdAt: "desc", },
    });
  }
}

export default new ReportRepository();