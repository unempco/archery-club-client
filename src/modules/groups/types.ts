import { z } from 'zod';

import {
  createGroupFormSchema,
  groupSchema,
  groupsSearchSchema,
  updateGroupFormSchema,
} from '@/modules/groups/schemas';

export type Group = z.infer<typeof groupSchema>;
export type CreateGroupFormData = z.infer<typeof createGroupFormSchema>;
export type UpdateGroupFormData = z.infer<typeof updateGroupFormSchema>;

export type GroupsSearchParams = z.infer<typeof groupsSearchSchema>;
