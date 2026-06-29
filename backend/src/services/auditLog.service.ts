import auditLogRepository from "../repositories/auditLog.repository";
import { RoleType } from "../generated/prisma/enums";
import { AuditContext } from "../types/audit.types";

class AuditLogService {

  async createLog(
    context: AuditContext,
    data: {
      action: string;
      entity: string;
      entityId: string;
    }
  ) {
    return auditLogRepository.createLog({
      ...data,
      userId: context.userId,
      tenantId: context.tenantId,
    });
  }

  async getAllLogs(tenantId: string,role: RoleType) {
    return auditLogRepository.getAllLogs(tenantId,role);
  }

  async getLogById(id: string) {
    return auditLogRepository.getLogById(id);
  }

}

export default new AuditLogService();