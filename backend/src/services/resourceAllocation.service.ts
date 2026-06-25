import resourceAllocationRepository from "../repositories/resourceAllocation.repository";
import projectRepository from "../repositories/project.repository";
import employeeRepository from "../repositories/employee.repository";
import AppError from "../utils/AppError";
import { CreateResourceAllocationDto, UpdateResourceAllocationDto, } from "../types/resourceAllocation.types";

class ResourceAllocationService {

  async getAllAllocations() {
    return resourceAllocationRepository.getAllAllocations();
  }

  async getAllocationById(id: string) {
    const allocation = await resourceAllocationRepository.getAllocationById(id);
    if (!allocation) {
      throw new AppError("Allocation not found",404);
    }
    return allocation;
  }

  async createAllocation(data: CreateResourceAllocationDto) {
    const project = await projectRepository.getProjectById(data.projectId);
    if (!project) {
      throw new AppError("Project not found",404);
    }
    const employee = await employeeRepository.getEmployeeById(data.employeeId);
    if (!employee) {
      throw new AppError("Employee not found",404);
    }
    const existing = await resourceAllocationRepository.getAllocationByProjectEmployee(data.projectId,data.employeeId);
    if (existing) {
      throw new AppError("Employee already allocated",400);
    }
    return resourceAllocationRepository.createAllocation(data);
  }

  async updateAllocation(id: string,data: UpdateResourceAllocationDto) {
    await this.getAllocationById(id);
    return resourceAllocationRepository.updateAllocation(id,data);
  }

  async deleteAllocation(id: string) {
    await this.getAllocationById(id);
    return resourceAllocationRepository.deleteAllocation(id);
  }
}

export default new ResourceAllocationService();