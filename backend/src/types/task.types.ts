import { TaskStatus } from "../generated/prisma/enums";

export interface CreateTaskDto {
  title: string;
  description?: string;
  projectId: string;
  assignedToId?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  assignedToId?: string;
  status?: TaskStatus;
}