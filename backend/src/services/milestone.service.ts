import milestoneRepository from "../repositories/milestone.repository";
import projectRepository from "../repositories/project.repository";
import AppError from "../utils/AppError";
import { CreateMilestoneDto, UpdateMilestoneDto, } from "../types/milestone.types";

class MilestoneService {

  async getAllMilestones() {
    return milestoneRepository.getAllMilestones();
  }

  async getMilestoneById(id: string) {
    const milestone = await milestoneRepository.getMilestoneById(id);
    if (!milestone) {
      throw new AppError("Milestone not found",404);
    }
    return milestone;
  }

  async createMilestone(data: CreateMilestoneDto) {
    const project = await projectRepository.getProjectById(data.projectId);
    if (!project) {
      throw new AppError("Project not found",404);
    }
    return milestoneRepository.createMilestone(data);
  }

  async updateMilestone(id: string,data: UpdateMilestoneDto) {
    await this.getMilestoneById(id);
    return milestoneRepository.updateMilestone(id,data);
  }

  async deleteMilestone(id: string) {
    await this.getMilestoneById(id);
    return milestoneRepository.deleteMilestone(id);
  }
}

export default new MilestoneService();