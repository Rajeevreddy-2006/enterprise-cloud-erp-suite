import prisma from "../config/database";
import { RoleType } from "../generated/prisma/enums";

class AuditLogRepository {

  async createLog(data: {
    action: string;
    entity: string;
    entityId: string;
    userId: string;
    tenantId: string;
  }) {
    return prisma.auditLog.create({
      data,
      include: { user: true, tenant: true, },
    });
  }

  async getAllLogs(tenantId: string,role: RoleType) {
    if (role === "TENANT_ADMIN") {
      return prisma.auditLog.findMany({
        include: { user: true, tenant: true, },
        orderBy: { createdAt: "desc", },
      });
    }
    return prisma.auditLog.findMany({
      where: { tenantId, },
      include: { user: true, tenant: true, },
      orderBy: { createdAt: "desc", },
    });
  }

  async getLogById(id: string) {
    return prisma.auditLog.findUnique({
      where: { id, }, 
      include: { user: true, tenant: true, },
    });
  }

}

export default new AuditLogRepository();