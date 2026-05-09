import type { Target } from '@/modules/targets/types';
import type { CellContext } from '@tanstack/react-table';

import { TargetActions } from '@/modules/targets/components/target-actions';

export function DataTableTargetActionsCell({
  row,
}: DataTableTargetActionsCellProps) {
  return <TargetActions target={row.original} />;
}

export type DataTableTargetActionsCellProps = CellContext<Target, unknown> & {};
