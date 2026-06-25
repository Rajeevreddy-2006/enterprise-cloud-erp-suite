export interface CreateResourceAllocationDto {
  projectId: string;
  employeeId: string;
  allocationPercentage: number;
}

export interface UpdateResourceAllocationDto {
  allocationPercentage?: number;
}