import prisma from "../config/database";
import { CreateMilestoneDto, UpdateMilestoneDto, } from "../types/milestone.types";

class MilestoneRepository {

  async getAllMilestones() {
    return prisma.milestone.findMany({
      include: { project: true, },
    });
  }

  async getMilestoneById(id: string) {
    return prisma.milestone.findUnique({
      where: { id },
      include: { project: true, },
    });
  }

  async createMilestone(data: CreateMilestoneDto) {
    return prisma.milestone.create({ data, });
  }

  async updateMilestone(id: string,data: UpdateMilestoneDto) {
    return prisma.milestone.update({
      where: { id },
      data,
    });
  }

  async deleteMilestone(id: string) {
    return prisma.milestone.delete({
      where: { id },
    });
  }
}

export default new MilestoneRepository();