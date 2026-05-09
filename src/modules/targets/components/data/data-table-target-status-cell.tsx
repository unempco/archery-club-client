import type { Target } from '@/modules/targets/types';
import type { CellContext } from '@tanstack/react-table';

import { TargetStatusBadge } from '@/modules/targets/components/target-status';

export function DateTableTargetStatusCell({
  cell,
}: DataTableTargetStatusCellProps) {
  return <TargetStatusBadge status={cell.getValue() as string} />;
}

export type DataTableTargetStatusCellProps = CellContext<Target, unknown>;
