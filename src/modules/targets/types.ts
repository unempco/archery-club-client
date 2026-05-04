import { z } from 'zod';

import {
  createTargetFormSchema,
  targetSchema,
  targetsSearchSchema,
  updateTargetFormSchema,
} from '@/modules/targets/schemas';

export type Target = z.infer<typeof targetSchema>;
export type CreateTargetFormData = z.infer<typeof createTargetFormSchema>;
export type UpdateTargetFormData = z.infer<typeof updateTargetFormSchema>;

export type TargetsSearchParams = z.infer<typeof targetsSearchSchema>;
