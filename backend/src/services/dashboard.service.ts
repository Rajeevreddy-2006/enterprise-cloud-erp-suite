import dashboardRepository from "../repositories/dashboard.repository";
import { RoleType } from "../generated/prisma/enums";

class DashboardService {

  async getSummary(tenantId: string,role: RoleType) {
    return dashboardRepository.getSummary(tenantId,role);
  }

  async getPayrollTrend(tenantId: string,role: RoleType) {
    return dashboardRepository.getPayrollTrend(tenantId,role);
  }

  async getDepartmentAnalytics(tenantId: string,role: RoleType) {
    return dashboardRepository.getDepartmentAnalytics(tenantId,role);
  }

  async getInventoryAnalytics(tenantId: string,role: RoleType) {
    return dashboardRepository.getInventoryAnalytics(tenantId,role);
  }

  async getRoleDashboard(tenantId: string,role: RoleType) {
    switch (role) {
        case "HR": return dashboardRepository.getHrDashboard(tenantId);
        case "ACCOUNTANT": return dashboardRepository.getFinanceDashboard(tenantId);
        case "TENANT_ADMIN":
        case "SUPER_ADMIN": return dashboardRepository.getExecutiveDashboard(tenantId);
        case "EMPLOYEE": return dashboardRepository.getEmployeeDashboard(tenantId);
        default: return dashboardRepository.getSummary(tenantId,role);
    }
  }
}

export default new DashboardService();