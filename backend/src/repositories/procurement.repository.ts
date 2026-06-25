import prisma from "../config/database";

class ProcurementRepository {
  async getDashboard(tenantId: string) {
    const [
      suppliers,
      purchaseRequests,
      approvedRequests,
      pendingRequests,
      purchaseOrders,
    ] = await Promise.all([
      prisma.supplier.count({
        where: { tenantId },
      }),
      prisma.purchaseRequest.count({
        where: { tenantId },
      }),
      prisma.purchaseRequest.count({
        where: { tenantId, status: "APPROVED", },
      }),
      prisma.purchaseRequest.count({
        where: { tenantId, status: "PENDING", },
      }),
      prisma.purchaseOrder.count({
        where: { tenantId },
      }),
    ]);
    return {
      suppliers,
      purchaseRequests,
      approvedRequests,
      pendingRequests,
      purchaseOrders,
    };
  }
}

export default new ProcurementRepository();