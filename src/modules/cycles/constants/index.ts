import type { EnumValues } from '@/core/types';

import { ItemStatus } from '@/core/constants/misc';

export const CycleStatus = {
  ACTIVE: ItemStatus.ACTIVE,
  COMPLETED: ItemStatus.COMPLETED,
  CANCELLED: ItemStatus.CANCELLED,
} as const;

export const cycleStatuses = Object.values(CycleStatus);

export type CycleStatus = EnumValues<typeof CycleStatus>;
