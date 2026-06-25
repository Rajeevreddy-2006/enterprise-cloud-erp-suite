import revenueRepository
from "../repositories/revenue.repository";

class RevenueService {

  async getDashboard(tenantId: string) {
    return revenueRepository.getDashboard(tenantId);
  }
}

export default new RevenueService();