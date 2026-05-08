import type { Session } from '@/modules/sessions/types';
import type { ColumnDef, VisibilityState } from '@tanstack/react-table';

import { DataTableCell } from '@/core/components/data/data-table-cell';
import { DataTableHeader } from '@/core/components/data/data-table-header';
import { DataTableColumnType } from '@/core/constants/data-table';
import { SessionActions } from '@/modules/sessions/components/session-actions';

/*
*     public int Id { get; set; }
    public int GroupId { get; set; }
    public DateTime ScheduledAt { get; set; }
    public int DurationMinutes { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public List<int>? TargetIds { get; set; }
* */

export const sessionsTableColumns: ColumnDef<Session>[] = [
  {
    accessorKey: 'id',
    meta: {
      headerI18nKey: 'sessions:fields.id',
      columnType: DataTableColumnType.ID,
    },
    header: DataTableHeader,
    cell: DataTableCell,
    enableHiding: false,
  },
  {
    accessorKey: 'notes',
    meta: {
      headerI18nKey: 'sessions:fields.notes',
      columnType: DataTableColumnType.PARAGRAPH,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'durationMinutes',
    meta: {
      headerI18nKey: 'sessions:fields.duration',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'groupId',
    meta: {
      headerI18nKey: 'sessions:fields.group',
      columnType: DataTableColumnType.NUMBER,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'scheduledAt',
    meta: {
      headerI18nKey: 'targets:fields.scheduledAt',
      columnType: DataTableColumnType.DATETIME,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    accessorKey: 'status',
    meta: {
      headerI18nKey: 'sessions:fields.status',
      columnType: DataTableColumnType.STATUS,
    },
    header: DataTableHeader,
    cell: DataTableCell,
  },
  {
    id: 'actions',
    cell: SessionActions,
    enableHiding: false,
  },
];

export const sessionsColumnsDefaultState: VisibilityState = {
  deletedAt: false,
};
