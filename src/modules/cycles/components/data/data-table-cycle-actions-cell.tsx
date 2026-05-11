import type { Cycle } from '@/modules/cycles/types';
import type { CellContext } from '@tanstack/react-table';

import { CycleActions } from '@/modules/cycles/components/cycle-actions';

export function DataTableCycleActionsCell({
  row,
}: DataTableCycleActionsCellProps) {
  return <CycleActions cycle={row.original} />;
}

export type DataTableCycleActionsCellProps = CellContext<Cycle, unknown>;
