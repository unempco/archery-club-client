import { z } from 'zod';

import { paginationSearchSchema } from '@/core/types/search-params';
import { sessionStatuses } from '@/modules/sessions/constants';

export const sessionSchema = z.object({
  // Server-generated fields
  id: z.number(),
  scheduledAt: z.string(),
  groupId: z.string(),
  // Form fields
  notes: z.string(),
  durationMinutes: z.number(),
  status: z.enum(sessionStatuses),
  targetIds: z.array(z.number()),
});

export const updateSessionFormSchema = sessionSchema.pick({
  status: true,
  notes: true,
});

export const sessionsFiltersSchema = z.object({
  includeDeleted: z.boolean().optional().catch(false),
});
export const sessionsSearchSchema = paginationSearchSchema.extend(
  sessionsFiltersSchema.shape,
);
