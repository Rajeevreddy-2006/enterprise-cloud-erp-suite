import { z } from "zod";

export const createTenantSchema = z.object({
  name: z
    .string()
    .min(2, "Tenant name must be at least 2 characters"),
    
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers and hyphens"
    ),
});

export const updateTenantSchema = createTenantSchema.partial().extend({
  isActive: z.boolean().optional(),
});