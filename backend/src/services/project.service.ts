import projectRepository from "../repositories/project.repository";
import AppError from "../utils/AppError";
import { CreateProjectDto, UpdateProjectDto, } from "../types/project.types";

class ProjectService {

  async getAllProjects() {
    return projectRepository.getAllProjects();
  }

  async getProjectById(id: string) {
    const project = await projectRepository.getProjectById(id);
    if (!project) {
      throw new AppError("Project not found",404);
    }
    return project;
  }

  async getProjectProgress(projectId: string) {
    const project = await projectRepository.getProjectProgress(projectId);
    if (!project) {
        throw new AppError("Project not found",404);
    }
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter( task => task.status === "DONE" ).length;
    const taskProgress = totalTasks === 0? 0: ( completedTasks /  totalTasks ) * 100;
    const totalMilestones = project.milestones.length;
    const completedMilestones = project.milestones.filter( milestone => milestone.status === "COMPLETED" ).length;
    const milestoneProgress = totalMilestones === 0? 0: ( completedMilestones / totalMilestones ) * 100;
    const overallProgress = (taskProgress +milestoneProgress) / 2;
    return {
        projectId: project.id,
        projectName: project.name,
        taskProgress,
        milestoneProgress,
        overallProgress,
    };
  }

  async getProjectDashboard(projectId: string) {
    const project = await projectRepository.getProjectDashboard(projectId);
    if (!project) {
        throw new AppError("Project not found",404);
    }
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(task => task.status === "DONE").length;
    const totalMilestones = project.milestones.length;
    const completedMilestones = project.milestones.filter(milestone => milestone.status ==="COMPLETED").length;
    const totalHours = project.timeEntries.reduce((sum, entry) => sum + Number(entry.hours),0);
    const allocatedEmployees = project.resourceAllocations.length;
    const progress = ((completedTasks /(totalTasks || 1)) + ( completedMilestones / (totalMilestones || 1))) * 50;
    return {
        projectId: project.id,
        projectName: project.name,
        totalTasks,
        completedTasks,
        totalMilestones,
        completedMilestones,
        allocatedEmployees,
        totalHours,
        progress,
    };
  }

  async createProject(data: CreateProjectDto) {
    return projectRepository.createProject(data);
  }

  async updateProject(id: string,data: UpdateProjectDto) {
    await this.getProjectById(id);
    return projectRepository.updateProject(id,data);
  }

  async deleteProject(id: string) {
    await this.getProjectById(id);
    return projectRepository.deleteProject(id);
  }
}

export default new ProjectService();