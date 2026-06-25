import prisma from "../config/database";
import { CreateTenantDto, UpdateTenantDto, } from "../types/tenant.types";
import { RoleType } from "../generated/prisma/enums";

class TenantRepository {

  async getAllTenants() {
    return prisma.tenant.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async createTenant(data: CreateTenantDto) {
    return prisma.tenant.create({
      data,
    });
  }

  async getTenantById(id: string) {
    return prisma.tenant.findUnique({
      where: { id },
    });
  }

  async getTenantBySlug(slug: string) {
    return prisma.tenant.findUnique({
      where: { slug },
    });
  }

  async updateTenant(id: string,data: UpdateTenantDto) {
    return prisma.tenant.update({
      where: { id },
      data,
    });
  }

  async deleteTenant(id: string) {
    return prisma.tenant.delete({
      where: { id },
    });
  }

}

export default new TenantRepository();