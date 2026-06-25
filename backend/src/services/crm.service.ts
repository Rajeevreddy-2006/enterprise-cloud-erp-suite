import crmRepository from "../repositories/crm.repository";

class CrmService {

  async getDashboard(tenantId: string) {
    return crmRepository.getDashboard(tenantId);
  }
}

export default new CrmService();