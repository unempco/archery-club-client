import { z } from 'zod';

import { ItemStatus } from '@/core/constants/misc';
import { paginationSearchSchema } from '@/core/types/search-params';

export const branchSchema = z.object({
  // Server-generated fields
  id: z.number(),
  createdAt: z.string(),
  closedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),
  isDeleted: z.boolean(),
  // Form field
  name: z.string().min(1, 'Name is required'),
  status: z.enum([ItemStatus.ACTIVE, ItemStatus.CLOSED]),
  maintenanceThreshold: z
    .int()
    .min(0, 'Maintenance threshold must be non-negative'),
  maintenanceWarningOffset: z
    .int()
    .min(0, 'Maintenance warning offset must be non-negative'),
});

export const createBranchFormSchema = branchSchema.pick({
  name: true,
  maintenanceThreshold: true,
  maintenanceWarningOffset: true,
});
export const updateBranchFormSchema = branchSchema.pick({
  name: true,
  status: true,
  maintenanceThreshold: true,
  maintenanceWarningOffset: true,
});

export const branchesFiltersSchema = z.object({
  search: z.string().optional().catch(''),
  includeDeleted: z.boolean().optional().catch(false),
});
export const branchesSearchSchema = paginationSearchSchema.extend(
  branchesFiltersSchema.shape,
);
