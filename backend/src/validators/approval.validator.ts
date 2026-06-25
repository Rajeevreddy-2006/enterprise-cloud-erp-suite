import { z } from "zod";
import { ApprovalStatus, } from "../generated/prisma/enums";

export const createApprovalRequestSchema = z.object({
    module: z.string().min(2),
    entityId: z.string(),
    requestedById: z.string(),
    tenantId: z.string(),
});

export const updateApprovalRequestSchema = z.object({
    status: z.enum(ApprovalStatus),
    remarks: z.string().optional(),
    approvedById: z.string(),
});