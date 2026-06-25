import prisma from "../config/database";

class RevenueRepository {

  async getDashboard(tenantId: string) {
    const [
      totalSalesOrders,
      totalInvoices,
      paidInvoices,
      totalPayments,
      invoices,
      payments,
    ] = await Promise.all([
      prisma.salesOrder.count({
        where: { tenantId },
      }),
      prisma.invoice.count({
        where: { tenantId },
      }),
      prisma.invoice.count({
        where: {
          tenantId,
          status: "PAID",
        },
      }),
      prisma.payment.count({
        where: {
          tenantId,
          status: "COMPLETED",
        },
      }),
      prisma.invoice.findMany({
        where: { tenantId },
      }),
      prisma.payment.findMany({
        where: {
          tenantId,
          status: "COMPLETED",
        },
      }),
    ]);
    const totalInvoiceAmount = invoices.reduce((sum, invoice) => sum + Number(invoice.amount),0);
    const totalRevenue = payments.reduce((sum, payment) => sum + Number(payment.amount),0);
    return {
      totalSalesOrders,
      totalInvoices,
      paidInvoices,
      totalPayments,
      totalInvoiceAmount,
      totalRevenue,
      outstandingRevenue:
      totalInvoiceAmount - totalRevenue,
    };
  }
}

export default new RevenueRepository();