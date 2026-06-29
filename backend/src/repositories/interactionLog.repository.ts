import prisma from "../config/database";
import { CreateInteractionLogDto, UpdateInteractionLogDto, } from "../types/interactionLog.types";

class InteractionLogRepository {

  async getAllInteractionLogs() {
    return prisma.interactionLog.findMany({
      include: { customer: true, lead: true, opportunity: true, employee: true, },
    });
  }

  async getInteractionLogById(id: string) {
    return prisma.interactionLog.findUnique({
      where: { id },
      include: { customer: true, lead: true, opportunity: true, employee: true, },
    });
  }

  async createInteractionLog(data: CreateInteractionLogDto) {
    return prisma.interactionLog.create({ data, });
  }

  async updateInteractionLog(id: string,data: UpdateInteractionLogDto) {
    return prisma.interactionLog.update({
      where: { id },
      data,
    });
  }

  async deleteInteractionLog(id: string) {
    return prisma.interactionLog.delete({
      where: { id },
    });
  }
}

export default new InteractionLogRepository();