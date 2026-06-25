import taskRepository from "../repositories/task.repository";
import employeeRepository from "../repositories/employee.repository";
import AppError from "../utils/AppError";
import { CreateTaskDto, UpdateTaskDto, } from "../types/task.types";

class TaskService {

  async getAllTasks() {
    return taskRepository.getAllTasks();
  }

  async getTaskById(id: string) {
    const task = await taskRepository.getTaskById(id);
    if (!task) {
      throw new AppError("Task not found",404);
    }
    return task;
  }

  async createTask(data: CreateTaskDto) {
    if (data.assignedToId) {
      const employee = await employeeRepository.getEmployeeById(data.assignedToId);
      if (!employee) {
        throw new AppError("Employee not found",404);
      }
    }
    return taskRepository.createTask(data);
  }

  async updateTask(id: string,data: UpdateTaskDto) {
    await this.getTaskById(id);
    if (data.assignedToId) {
      const employee = await employeeRepository.getEmployeeById(data.assignedToId);
      if (!employee) {
        throw new AppError("Employee not found",404);
      }
    }
    return taskRepository.updateTask(id,data);
  }

  async deleteTask(id: string) {
    await this.getTaskById(id);
    return taskRepository.deleteTask(id);
  }
}

export default new TaskService();