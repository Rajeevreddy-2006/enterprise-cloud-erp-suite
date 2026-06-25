import procurementRepository from "../repositories/procurement.repository";

class ProcurementService {

  async getDashboard(tenantId: string) {
    return procurementRepository.getDashboard(tenantId);
  }
}

export default new ProcurementService();