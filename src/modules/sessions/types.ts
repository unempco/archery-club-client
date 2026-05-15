import type { sessionSchema } from '@/modules/sessions/schemas';

import { z } from 'zod';

import {
  groupSessionsSearchSchema,
  sessionsSearchSchema,
  updateSessionFormSchema,
} from '@/modules/sessions/schemas';

export type Session = z.infer<typeof sessionSchema>;
export type UpdateSessionFormData = z.infer<typeof updateSessionFormSchema>;

export type SessionsSearchParams = z.infer<typeof sessionsSearchSchema>;

//=================>By Group<==================//

export type GroupSessionsSearchParams = z.infer<
  typeof groupSessionsSearchSchema
>;
