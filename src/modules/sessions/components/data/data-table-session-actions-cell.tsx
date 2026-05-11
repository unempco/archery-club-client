import type { Session } from '@/modules/sessions/types';
import type { CellContext } from '@tanstack/react-table';

import { SessionActions } from '@/modules/sessions/components/session-actions';

export function DataTableSessionActionsCell({
  row,
}: DataTableSessionActionsCellProps) {
  return <SessionActions session={row.original} />;
}

export type DataTableSessionActionsCellProps = CellContext<Session, unknown>;
