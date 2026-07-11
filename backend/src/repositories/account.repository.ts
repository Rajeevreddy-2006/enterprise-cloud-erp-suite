import prisma from "../config/database";
import { CreateAccountDto, UpdateAccountDto, } from "../types/account.types";
import { RoleType } from "../generated/prisma/enums";

class AccountRepository {

  async getAllAccounts(tenantId: string, role: RoleType) {
    if (role === "TENANT_ADMIN") {
      return prisma.account.findMany({
        include: { tenant: true, },
      });
    }
    return prisma.account.findMany({
      where: { tenantId, },
      include: { tenant: true, },
    });
  }

  async getAccountById(id: string) {
    return prisma.account.findUnique({
      where: { id },
      include: { tenant: true, },
    });
  }

  async createAccount(data: CreateAccountDto) {
    return prisma.account.create({
      data,
      include: { tenant: true, },
    });
  }

  async updateAccount(id: string,data: UpdateAccountDto) {
    return prisma.account.update({
      where: { id },
      data,
      include: { tenant: true, },
    });
  }

  async deleteAccount(id: string) {
    return prisma.account.delete({
      where: { id },
    });
  }
}

export default new AccountRepository();