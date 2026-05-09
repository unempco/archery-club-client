import type { EnumValues } from '@/core/types';

import { ItemStatus } from '@/core/constants/misc';

export const SessionStatus = {
  SCHEDULED: ItemStatus.SCHEDULED,
  COMPLETED: ItemStatus.COMPLETED,
  CANCELLED: ItemStatus.CANCELLED,
} as const;

export const sessionStatuses = Object.values(SessionStatus);
export type SessionStatus = EnumValues<typeof SessionStatus>;
