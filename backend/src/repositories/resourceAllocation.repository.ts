import prisma from "../config/database";
import { CreateResourceAllocationDto, UpdateResourceAllocationDto, } from "../types/resourceAllocation.types";

class ResourceAllocationRepository {

  async getAllAllocations() {
    return prisma.resourceAllocation.findMany({
      include: { project: true, employee: true, },
    });
  }

  async getAllocationById(id: string) {
    return prisma.resourceAllocation.findUnique({
      where: { id },
      include: { project: true, employee: true, },
    });
  }

  async getAllocationByProjectEmployee(projectId: string,employeeId: string) {
    return prisma.resourceAllocation.findFirst({
      where: { projectId, employeeId, },
    });
  }

  async createAllocation(data: CreateResourceAllocationDto) {
    return prisma.resourceAllocation.create({data,});
  }

  async updateAllocation(id: string,data: UpdateResourceAllocationDto) {
    return prisma.resourceAllocation.update({
      where: { id },
      data,
    });
  }

  async deleteAllocation(id: string) {
    return prisma.resourceAllocation.delete({
      where: { id },
    });
  }
}

export default new ResourceAllocationRepository();