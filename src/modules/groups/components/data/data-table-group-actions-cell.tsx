import type { Group } from '@/modules/groups/types';
import type { CellContext } from '@tanstack/react-table';

import { GroupActions } from '@/modules/groups/components/group-actions';

export function DataTableGroupActionsCell({
  row,
}: DataTableGroupActionsCellProps) {
  return <GroupActions group={row.original} />;
}

export type DataTableGroupActionsCellProps = CellContext<Group, unknown>;
