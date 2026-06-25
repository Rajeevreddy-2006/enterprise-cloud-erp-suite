import timeEntryRepository from "../repositories/timeEntry.repository";
import employeeRepository from "../repositories/employee.repository";
import projectRepository from "../repositories/project.repository";
import taskRepository from "../repositories/task.repository";
import AppError from "../utils/AppError";
import { CreateTimeEntryDto, UpdateTimeEntryDto, } from "../types/timeEntry.types";

class TimeEntryService {

  async getAllTimeEntries() {
    return timeEntryRepository.getAllTimeEntries();
  }

  async getTimeEntryById(id: string) {
    const timeEntry = await timeEntryRepository.getTimeEntryById(id);
    if (!timeEntry) {
      throw new AppError("Time entry not found",404);
    }
    return timeEntry;
  }

  async createTimeEntry(data: CreateTimeEntryDto) {
    const employee = await employeeRepository.getEmployeeById(data.employeeId);
    if (!employee) {
      throw new AppError("Employee not found",404);
    }
    const project = await projectRepository.getProjectById(data.projectId);
    if (!project) {
      throw new AppError("Project not found",404);
    }
    if (data.taskId) {
      const task = await taskRepository.getTaskById(data.taskId);
      if (!task) {
        throw new AppError("Task not found",404);
      }
    }
    return timeEntryRepository.createTimeEntry(data);
  }

  async updateTimeEntry(id: string,data: UpdateTimeEntryDto) {
    await this.getTimeEntryById(id);
    return timeEntryRepository.updateTimeEntry(id,data);
  }

  async deleteTimeEntry(id: string) {
    await this.getTimeEntryById(id);
    return timeEntryRepository.deleteTimeEntry(id);
  }
}

export default new TimeEntryService();