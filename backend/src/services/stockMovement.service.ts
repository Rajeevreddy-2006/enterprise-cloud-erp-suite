import stockMovementRepository from "../repositories/stockMovement.repository";
import AppError from "../utils/AppError";
import { CreateStockMovementDto } from "../types/stockMovement.types";

class StockMovementService {

  async getAllMovements() {
    return stockMovementRepository.getAllMovements();
  }

  async getMovementById(id: string) {
    const movement = await stockMovementRepository.getMovementById(id);
    if (!movement) {
      throw new AppError("Stock movement not found",404);
    }
    return movement;
  }

  async createMovement(data: CreateStockMovementDto) {
    return stockMovementRepository.createMovement(data);
  }

  async deleteMovement(id: string) {
    await this.getMovementById(id);
    return stockMovementRepository.deleteMovement(id);
  }
}

export default new StockMovementService();