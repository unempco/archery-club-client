import type { EnumValues } from '@/core/types';

import { ItemStatus } from '@/core/constants/misc';

export const BranchStatus = {
  ACTIVE: ItemStatus.ACTIVE,
  CLOSED: ItemStatus.CLOSED,
} as const;

export const branchStatuses = Object.values(BranchStatus);

export type BranchStatus = EnumValues<typeof BranchStatus>;
