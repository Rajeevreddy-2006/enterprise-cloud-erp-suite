import prisma from "../config/database";

class ApprovalRepository {

  async getAllRequests() {
    return prisma.approvalRequest.findMany({
      include: { requestedBy: true, approvedBy: true, tenant: true, },
    });
  }

  async getRequestById(id: string) {
    return prisma.approvalRequest.findUnique({
      where: { id },
      include: { requestedBy: true, approvedBy: true, tenant: true, },
    });
  }

  async createRequest(data: any) {
    return prisma.approvalRequest.create({ data, });
  }

  async updateRequest(id: string,data: any) {
    return prisma.approvalRequest.update({
      where: { id },
      data,
    });
  }
}

export default new ApprovalRepository();