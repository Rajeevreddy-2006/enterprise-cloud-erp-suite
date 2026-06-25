import executiveRepository
from "../repositories/executive.repository";

class ExecutiveService {

  async getDashboard(tenantId: string) {
    return executiveRepository.getDashboard(tenantId);
  }
}

export default new ExecutiveService();