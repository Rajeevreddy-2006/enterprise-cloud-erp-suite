import { ProjectStatus } from "../generated/prisma/enums";

export interface CreateProjectDto {
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  tenantId: string;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: ProjectStatus;
}