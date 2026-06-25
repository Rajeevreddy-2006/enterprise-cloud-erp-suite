import { MilestoneStatus } from "../generated/prisma/enums";

export interface CreateMilestoneDto {
  title: string;
  description?: string;
  dueDate?: Date;
  projectId: string;
}

export interface UpdateMilestoneDto {
  title?: string;
  description?: string;
  dueDate?: Date;
  status?: MilestoneStatus;
}