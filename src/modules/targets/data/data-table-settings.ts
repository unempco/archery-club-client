import type { Target } from '@/modules/targets/types';
import type { ColumnDef, VisibilityState } from '@tanstack/react-table';

import { DataTableCell } from '@/core/components/data/data-table-cell';
import { DataTableHeader } from '@/core/components/data/data-table-header';
import { DataTableColumnType } from '@/core/constants/data-table';
import { DateTableTargetStatusCell } from '@/modules/targets/componentes/data/data-table-target-status-cell';
import { TargetActions } from '@/modules/targets/componentes/target-actions';

export const targetsTableColumns: ColumnDef<Target>[] = [
  {
    accessorKey: 'id',
    meta: {
      headerI18nKey: 'targets:attribs.id',
      columnType: DataTableColumnType.ID,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    meta: {
      headerI18nKey: 'targets:attribs.name',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'usageCount',
    meta: {
      headerI18nKey: 'targets:attribs.usageCount',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'branchId',
    meta: {
      headerI18nKey: 'targets:attribs.branch',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'status',
    meta: {
      headerI18nKey: 'targets:attribs.status',
    },
    header: DataTableHeader,
    cell: DateTableTargetStatusCell,
  },
  {
    accessorKey: 'createdAt',
    meta: {
      headerI18nKey: 'targets:attribs.createdAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'deletedAt',
    meta: {
      headerI18nKey: 'targets:attribs.deletedAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    id: 'actions',
    cell: TargetActions,
    enableHiding: false,
  },
];

export const targetsColumnsDefaultState: VisibilityState = {
  deletedAt: false,
};
