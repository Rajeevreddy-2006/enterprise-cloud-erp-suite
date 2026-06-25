export interface CreateTimeEntryDto {
  date: Date;
  hours: number;
  description?: string;
  employeeId: string;
  projectId: string;
  taskId?: string;
}

export interface UpdateTimeEntryDto {
  date?: Date;
  hours?: number;
  description?: string;
}