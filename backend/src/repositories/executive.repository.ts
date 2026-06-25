import prisma from "../config/database";

class ExecutiveRepository {

  async getDashboard(tenantId: string) {
    const [
      totalEmployees,
      pendingLeaves,
      totalDepartments,
      totalInventoryItems,
      totalAssets,
      totalCustomers,
      totalLeads,
      totalOpportunities,
      totalSalesOrders,
      totalInvoices,
      totalPayments,
      totalPurchaseOrders,
      totalSuppliers,
    ] = await Promise.all([
      prisma.employee.count({
        where: { tenantId },
      }),
      prisma.leave.count({
        where: { tenantId, status: "PENDING", },
      }),
      prisma.department.count({
        where: { tenantId },
      }),
      prisma.inventoryItem.count({
        where: { tenantId },
      }),
      prisma.asset.count({
        where: { tenantId },
      }),
      prisma.customer.count({
        where: { tenantId },
      }),
      prisma.lead.count({
        where: { tenantId },
      }),
      prisma.opportunity.count({
        where: { tenantId },
      }),
      prisma.salesOrder.count({
        where: { tenantId },
      }),
      prisma.invoice.count({
        where: { tenantId },
      }),
      prisma.payment.count({
        where: { tenantId },
      }),
      prisma.purchaseOrder.count({
        where: { tenantId },
      }),
      prisma.supplier.count({
        where: { tenantId },
      }),
    ]);
    return {
      totalEmployees,
      pendingLeaves,
      totalDepartments,
      totalInventoryItems,
      totalAssets,
      totalCustomers,
      totalLeads,
      totalOpportunities,
      totalSalesOrders,
      totalInvoices,
      totalPayments,
      totalPurchaseOrders,
      totalSuppliers,
    };
  }
}

export default new ExecutiveRepository();