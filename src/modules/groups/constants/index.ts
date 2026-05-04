import type { EnumValues } from '@/core/types';

export const Weekday = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
} as const;

export type Weekday = EnumValues<typeof Weekday>;
