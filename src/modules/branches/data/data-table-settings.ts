import type { Branch } from '@/modules/branches/types';
import type { ColumnDef, VisibilityState } from '@tanstack/react-table';

import { DataTableCell } from '@/core/components/data/data-table-cell';
import { DataTableHeader } from '@/core/components/data/data-table-header';
import { DataTableColumnType } from '@/core/constants/data-table';
import { BranchActions } from '@/modules/branches/componentes/branch-actions';

export const branchesTableColumns: ColumnDef<Branch>[] = [
  {
    accessorKey: 'id',
    meta: {
      headerI18nKey: 'branches:attribs.id',
      columnType: DataTableColumnType.ID,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    meta: {
      headerI18nKey: 'branches:attribs.name',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'maintenanceThreshold',
    meta: {
      headerI18nKey: 'branches:attribs.maintenanceThreshold',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'maintenanceWarningOffset',
    meta: {
      headerI18nKey: 'branches:attribs.maintenanceWarningOffset',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'status',
    meta: {
      headerI18nKey: 'branches:attribs.status',
      columnType: DataTableColumnType.STATUS,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'closedAt',
    meta: {
      headerI18nKey: 'branches:attribs.closedAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'createdAt',
    meta: {
      headerI18nKey: 'branches:attribs.createdAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    id: 'actions',
    cell: BranchActions,
    enableHiding: false,
  },
];

export const branchesColumnsDefaultState: VisibilityState = {
  deletedAt: false,
};
