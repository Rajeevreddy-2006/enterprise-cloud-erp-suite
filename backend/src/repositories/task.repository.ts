import prisma from "../config/database";
import { CreateTaskDto, UpdateTaskDto, } from "../types/task.types";

class TaskRepository {

    async getAllTasks() {
        return prisma.task.findMany({
            include: { project: true, assignedTo: true, },
        });
    }

    async getTaskById(id: string) {
        return prisma.task.findUnique({
            where: { id },
            include: { project: true, assignedTo: true, },
        });
    }

    async createTask(data: CreateTaskDto) {
        return prisma.task.create({ data, });
    }

    async updateTask(id: string,data: UpdateTaskDto) {
        return prisma.task.update({
            where: { id },
            data,
        });
    }

    async deleteTask(id: string) {
        return prisma.task.delete({
            where: { id },
        });
    }
}

export default new TaskRepository();
