import accountRepository from "../repositories/account.repository";
import { CreateAccountDto, UpdateAccountDto } from "../types/account.types";
import { RoleType } from "../generated/prisma/enums";

class AccountService {

  async getAllAccounts(tenantId: string,role: RoleType) {
    return accountRepository.getAllAccounts(tenantId,role);
  }

  async getAccountById(id: string) {
    return accountRepository.getAccountById(id);
  }

  async createAccount(data: CreateAccountDto) {
    return accountRepository.createAccount(data);
  }

  async updateAccount(id: string,data: UpdateAccountDto) {
    return accountRepository.updateAccount(id,data);
  }

  async deleteAccount(id: string) {
    return accountRepository.deleteAccount(id);
  }
}

export default new AccountService();