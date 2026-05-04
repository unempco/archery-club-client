import type { Cycle } from '@/modules/cycles/types';
import type { ColumnDef, VisibilityState } from '@tanstack/react-table';

import { DataTableCell } from '@/core/components/data/data-table-cell';
import { DataTableHeader } from '@/core/components/data/data-table-header';
import { DataTableColumnType } from '@/core/constants/data-table';
import { CycleActions } from '@/modules/cycles/componentes/cycle-actions';

export const cyclesTableColumns: ColumnDef<Cycle>[] = [
  {
    accessorKey: 'id',
    meta: {
      headerI18nKey: 'cycles:attribs.id',
      columnType: DataTableColumnType.ID,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    meta: {
      headerI18nKey: 'cycles:attribs.name',
      columnType: DataTableColumnType.TEXT,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'startDate',
    meta: {
      headerI18nKey: 'cycles:attribs.startDate',
      columnType: DataTableColumnType.DATE,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'sessionCount',
    meta: {
      headerI18nKey: 'cycles:attribs.sessionCount',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'branchId',
    meta: {
      headerI18nKey: 'cycles:attribs.branch',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'status',
    meta: {
      headerI18nKey: 'cycles:attribs.status',
      columnType: DataTableColumnType.STATUS,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'createdAt',
    meta: {
      headerI18nKey: 'cycles:attribs.createdAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'deletedAt',
    meta: {
      headerI18nKey: 'cycles:attribs.deletedAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    id: 'actions',
    cell: CycleActions,
    enableHiding: false,
  },
];

export const cyclesColumnsDefaultState: VisibilityState = {
  deletedAt: false,
};
