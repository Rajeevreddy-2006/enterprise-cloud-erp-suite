import prisma from "../config/database";
import { RoleType, LeaveStatus } from "../generated/prisma/enums";

class DashboardRepository {

  async getSummary(tenantId: string,role: RoleType) {
    const employeeWhere = role === "SUPER_ADMIN"? {}: { tenantId };
    const departmentWhere = role === "SUPER_ADMIN"? {}: { tenantId };
    const userWhere = role === "SUPER_ADMIN"? {}: { tenantId };
    const accountWhere = role === "SUPER_ADMIN"? {}: { tenantId };
    const transactionWhere =  role === "SUPER_ADMIN"? {}: { tenantId };
    const inventoryWhere = role === "SUPER_ADMIN"? {}: { tenantId };
    const purchaseOrderWhere = role === "SUPER_ADMIN"? {}: { tenantId };
    const payrollWhere = role === "SUPER_ADMIN"? {}: { tenantId };
    const pendingLeaveWhere = role === "SUPER_ADMIN"? { status: LeaveStatus.PENDING }: { tenantId, status: LeaveStatus.PENDING, };
    const notificationWhere = role === "SUPER_ADMIN"? { isRead: false }: { tenantId, isRead: false, };
    const [ totalEmployees,totalDepartments,totalUsers,totalAccounts,totalTransactions,
        totalInventoryItems,totalPurchaseOrders,totalPayrolls,pendingLeaves,unreadNotifications,] = 
    await Promise.all([
      prisma.employee.count({ where: employeeWhere, }),
      prisma.department.count({ where: departmentWhere, }),
      prisma.user.count({ where: userWhere, }),
      prisma.account.count({ where: accountWhere, }),
      prisma.transaction.count({ where: transactionWhere, }),
      prisma.inventoryItem.count({ where: inventoryWhere, }),
      prisma.purchaseOrder.count({ where: purchaseOrderWhere, }),
      prisma.payroll.count({ where: payrollWhere, }),
      prisma.leave.count({ where: pendingLeaveWhere, }),
      prisma.notification.count({ where: notificationWhere,}),
    ]);
    const payrollCost = await prisma.payroll.aggregate({
        where: payrollWhere,
        _sum: { netSalary: true, },
    });
    const accountBalance = await prisma.account.aggregate({
        where: accountWhere,
        _sum: { balance: true, },
    });
    const inventoryItems = await prisma.inventoryItem.findMany({
        where: inventoryWhere,
        select: { quantity: true, unitPrice: true, },
    });
    const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + item.quantity * Number(item.unitPrice),0);
    return {
      totalEmployees,
      totalDepartments,
      totalUsers,
      totalAccounts,
      totalTransactions,
      totalInventoryItems,
      totalPurchaseOrders,
      totalPayrolls,
      pendingLeaves,
      unreadNotifications,
      totalPayrollCost: payrollCost._sum.netSalary ?? 0,
      totalAccountBalance: accountBalance._sum.balance ?? 0,
      totalInventoryValue,
    };
  }

  async getPayrollTrend(tenantId: string,role: RoleType) {
    const payrolls = await prisma.payroll.findMany({
        where: role === "SUPER_ADMIN"? {}: { tenantId },
        select: { month: true, year: true, netSalary: true, },
    });
    const trend = new Map<string,number>();
    payrolls.forEach(
        (payroll) => {
            const period = `${payroll.month}/${payroll.year}`;
            trend.set(period,(trend.get(period) || 0) + Number(payroll.netSalary));
        }
    );
    return Array.from(trend.entries()).map(([period, amount]) => ({period,amount,}));
  }

  async getDepartmentAnalytics(tenantId: string,role: RoleType) {
    const departments = await prisma.department.findMany({
        where: role === "SUPER_ADMIN"? {}: { tenantId },
        include: { employees: true, },
    });
    return departments.map((department) => ({department: department.name,employeeCount: department.employees.length,}));
  }

  async getInventoryAnalytics(tenantId: string,role: RoleType) {
    const items = await prisma.inventoryItem.findMany({
        where: role === "SUPER_ADMIN"? {}: { tenantId }, 
    });
    return items.map(
        (item) => ({
            itemName: item.name,
            quantity: item.quantity,
            value: item.quantity * Number(item.unitPrice),
        })
    );
  }

  async getHrDashboard(tenantId: string) {
    const [ employees, departments, pendingLeaves, payrolls, ] = await Promise.all([
        prisma.employee.count({
        where: { tenantId },
        }),
        prisma.department.count({
        where: { tenantId },
        }),
        prisma.leave.count({
        where: { tenantId, status: "PENDING", },
        }),
        prisma.payroll.count({
        where: { tenantId },
        }),
    ]);
    return {
        employees,
        departments,
        pendingLeaves,
        payrolls,
    };
  }

  async getFinanceDashboard(tenantId: string) {
    const [ accounts, transactions, invoices, payments, ] = await Promise.all([
        prisma.account.count({
        where: { tenantId },
        }),
        prisma.transaction.count({
        where: { tenantId },
        }),
        prisma.invoice.count({
        where: { tenantId },
        }),
        prisma.payment.count({
        where: { tenantId },
        }),
    ]);
    return {
        accounts,
        transactions,
        invoices,
        payments,
    };
  }

  async getInventoryDashboard(tenantId: string) {
    const [ items, assets, suppliers, purchaseOrders,] = await Promise.all([
        prisma.inventoryItem.count({
        where: { tenantId },
        }),
        prisma.asset.count({
        where: { tenantId },
        }),
        prisma.supplier.count({
        where: { tenantId },
        }),
        prisma.purchaseOrder.count({
        where: { tenantId },
        }),
    ]);
    return {
        items,
        assets,
        suppliers,
        purchaseOrders,
    };
  }

  async getExecutiveDashboard(tenantId: string) {
    const [ totalEmployees, totalDepartments, totalUsers, totalInventoryItems, totalPurchaseOrders, ] = await Promise.all([
        prisma.employee.count({
        where: { tenantId },
        }),
        prisma.department.count({
        where: { tenantId },
        }),
        prisma.user.count({
        where: { tenantId },
        }),
        prisma.inventoryItem.count({
        where: { tenantId },
        }),
        prisma.purchaseOrder.count({
        where: { tenantId },
        }),
    ]);
    return {
        totalEmployees,
        totalDepartments,
        totalUsers,
        totalInventoryItems,
        totalPurchaseOrders,
    };
  }

  async getEmployeeDashboard(tenantId: string) {
    const [ notifications,leaves,] = await Promise.all([
        prisma.notification.count({
        where: { tenantId, isRead: false, },
        }),
        prisma.leave.count({
        where: { tenantId, },
        }),
    ]);
    return { notifications, leaves, };
  }
}

export default new DashboardRepository();