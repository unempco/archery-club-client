import type { EnumValues } from '@/core/types';

import { ItemStatus } from '@/core/constants/misc';

export const Weekday = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
} as const;

export const GroupStatus = {
  ACTIVE: ItemStatus.ACTIVE,
  INACTIVE: ItemStatus.INACTIVE,
} as const;

export const groupStatuses = Object.values(GroupStatus);

export type Weekday = EnumValues<typeof Weekday>;
export type GroupStatus = EnumValues<typeof GroupStatus>;
