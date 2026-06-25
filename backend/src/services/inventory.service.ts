import inventoryRepository from "../repositories/inventory.repository";
import { CreateInventoryDto, UpdateInventoryDto, } from "../types/inventory.types";
import { RoleType } from "../generated/prisma/enums";

class InventoryService {

  async getAllInventoryItems(tenantId: string,role: RoleType) {
    return inventoryRepository.getAllInventoryItems(tenantId,role);
  }

  async getInventoryItemById(id: string) {
    return inventoryRepository.getInventoryItemById(id);
  }

  async createInventoryItem(data: CreateInventoryDto) {
    return inventoryRepository.createInventoryItem(data);
  }

  async updateInventoryItem(id: string,data: UpdateInventoryDto) {
    return inventoryRepository.updateInventoryItem(id,data);
  }

  async deleteInventoryItem(id: string) {
    return inventoryRepository.deleteInventoryItem(id);
  }
}

export default new InventoryService();