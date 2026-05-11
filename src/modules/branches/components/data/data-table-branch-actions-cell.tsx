import type { Branch } from '@/modules/branches/types';
import type { CellContext } from '@tanstack/react-table';

import { BranchActions } from '@/modules/branches/components/branch-actions';

export function DataTableBranchActionsCell({
  row,
}: DataTableBranchActionsCellProps) {
  return <BranchActions branch={row.original} />;
}

export type DataTableBranchActionsCellProps = CellContext<Branch, unknown>;
