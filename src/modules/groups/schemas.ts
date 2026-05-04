import { z } from 'zod';

import { paginationSearchSchema } from '@/core/types/search-params';
import { groupStatuses } from '@/modules/groups/constants';

export const groupSchema = z.object({
  // Server-generated fields
  id: z.number(),
  isDeleted: z.boolean(),
  deletedAt: z.string().nullable(),
  createdAt: z.string(),
  status: z.enum(groupStatuses),
  // Form fields
  name: z.string(),
  cycleId: z.coerce.number(),
  weekday: z.coerce.number().min(0).max(6),
  startTime: z.string(), // HH:mm format
  durationMinutes: z.coerce.number().min(0),
});

export const createGroupFormSchema = groupSchema.pick({
  name: true,
  cycleId: true,
  weekday: true,
  startTime: true,
  durationMinutes: true,
});

export const updateGroupFormSchema = groupSchema.pick({
  name: true,
  status: true,
  startTime: true,
  durationMinutes: true,
});

export const groupsFiltersSchema = z.object({
  search: z.string().optional().catch(''),
  includeDeleted: z.boolean().optional().catch(false),
});
export const groupsSearchSchema = paginationSearchSchema.extend(
  groupsFiltersSchema.shape,
);
