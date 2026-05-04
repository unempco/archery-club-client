import type { Group } from '@/modules/groups/types';
import type { CellContext } from '@tanstack/react-table';

import { useTranslation } from 'react-i18next';

export function DateTableWeekdayCell({ cell }: DataTableWeekdayCellProps) {
  const { t } = useTranslation();

  const weekday = cell.getValue();

  if (typeof weekday !== 'number' || weekday < 0 || weekday > 6) {
    return <span>-</span>;
  }

  return <span>{t(`groups:constants.weekdays.${weekday}`)}</span>;
}

export type DataTableWeekdayCellProps = CellContext<Group, unknown>;
