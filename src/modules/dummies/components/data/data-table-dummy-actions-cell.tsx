import type { Dummy } from '@/modules/dummies/types';
import type { CellContext } from '@tanstack/react-table';

import { DummyActions } from '@/modules/dummies/components/dummy-actions';

export function DataTableDummyActionsCell({ row }: DataTableDummyActionsProps) {
  return <DummyActions dummy={row.original} />;
}

export type DataTableDummyActionsProps = CellContext<Dummy, unknown>;
