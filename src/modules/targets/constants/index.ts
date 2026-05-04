import type { EnumValues } from '@/core/types';

import { ItemStatus } from '@/core/constants/misc';

export const TargetStatus = {
  ACTIVE: ItemStatus.ACTIVE,
  RETIRED: 'retired',
  UNDER_MAINTENANCE: 'underMaintenance',
} as const;

export const targetStatuses = Object.values(TargetStatus);
export type TargetStatus = EnumValues<typeof TargetStatus>;
