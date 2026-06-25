import { z } from "zod";

export const createResourceAllocationSchema =
  z.object({
    projectId: z.string(),
    employeeId: z.string(),
    allocationPercentage: z.number()
      .min(1)
      .max(100),
  });

export const updateResourceAllocationSchema =
  z.object({
    allocationPercentage: z.number()
      .min(1)
      .max(100)
      .optional(),
  });