import { z } from 'zod';

import { ItemStatus } from '@/core/constants/misc';
import { paginationSearchSchema } from '@/core/types/search-params';

export const cycleSchema = z.object({
  // Server-generated fields
  id: z.number(),
  isDeleted: z.boolean(),
  deletedAt: z.string().nullable(),
  createdAt: z.string(),
  // Form fields
  name: z.string(),
  branchId: z.coerce.number(),
  startDate: z.coerce.date(),
  sessionCount: z.number(),
  status: z.enum([
    ItemStatus.ACTIVE,
    ItemStatus.COMPLETED,
    ItemStatus.CANCELLED,
  ]),
});

export const createCycleFormSchema = cycleSchema.pick({
  name: true,
  branchId: true,
  startDate: true,
  sessionCount: true,
});
export const updateCycleFormSchema = cycleSchema.pick({
  name: true,
  status: true,
});

export const cyclesFiltersSchema = z.object({
  search: z.string().optional().catch(''),
  includeDeleted: z.boolean().optional().catch(false),
});
export const cyclesSearchSchema = paginationSearchSchema.extend(
  cyclesFiltersSchema.shape,
);
