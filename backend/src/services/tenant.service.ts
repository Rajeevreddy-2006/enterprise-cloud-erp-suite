import tenantRepository from "../repositories/tenant.repository";
import { CreateTenantDto, UpdateTenantDto, } from "../types/tenant.types";
import { RoleType } from "../generated/prisma/enums";

class TenantService {

  async getAllTenants(tenantId: string,role: RoleType) {
    return tenantRepository.getAllTenants();
  }

  async getTenantById(id: string) {
    return tenantRepository.getTenantById(id);
  }

  async createTenant(data: CreateTenantDto) {
    return tenantRepository.createTenant(data);
  }

  async updateTenant(id: string,data: UpdateTenantDto) {
    return tenantRepository.updateTenant(id, data);
  }

  async deleteTenant(id: string) {
    return tenantRepository.deleteTenant(id);
  }
}

export default new TenantService();