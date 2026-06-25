import prisma from "../config/database";
import { CreateProjectDto, UpdateProjectDto, } from "../types/project.types";

class ProjectRepository {

    async getAllProjects() {
        return prisma.project.findMany({
            include: { tasks: true, tenant: true, },
        });
    }

    async getProjectById(id: string) {
        return prisma.project.findUnique({
        where: { id },
            include: { tasks: true, tenant: true, },
        });
    }

    async getProjectProgress(projectId: string) {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: { tasks: true, milestones: true, },
        });
        return project;
    }

    async createProject(data: CreateProjectDto) {
        return prisma.project.create({ data, });
    }

    async updateProject(id: string,data: UpdateProjectDto) {
        return prisma.project.update({
            where: { id },
            data,
        });
    }

    async deleteProject(id: string) {
        return prisma.project.delete({
            where: { id },
        });
    }
}

export default new ProjectRepository();
