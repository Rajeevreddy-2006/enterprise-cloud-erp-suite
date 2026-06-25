import auditLogRepository from "../repositories/auditLog.repository";
import { RoleType } from "../generated/prisma/enums";

class AuditLogService {

  async createLog(data: {
    action: string;
    entity: string;
    entityId: string;
    userId: string;
    tenantId: string;
  }) {
    return auditLogRepository.createLog(data);
  }

  async getAllLogs(tenantId: string,role: RoleType) {
    return auditLogRepository.getAllLogs(tenantId,role);
  }

  async getLogById(id: string) {
    return auditLogRepository.getLogById(id);
  }

}

export default new AuditLogService();