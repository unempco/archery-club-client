import type { Cycle } from '@/modules/cycles/types';

import {
  BuildingOfficeIcon,
  CalendarIcon,
  CalendarXIcon,
  HashIcon,
  PulseIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { StatusBadge } from '@/core/components/status-badge';
import { formatDate } from '@/core/lib/dates';
import { cn } from '@/core/lib/utils';
import { DetailFieldItem } from '@/modules/shared/components/detail-field-item';
import projectConfig from '@/project.config';

export function CycleDetails({ cycle, className }: CycleDetailsProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4',
        className,
      )}
    >
      <DetailFieldItem
        icon={PulseIcon}
        label={t('cycles:fields.status')}
        value={<StatusBadge status={cycle.status} />}
      />
      <DetailFieldItem
        icon={BuildingOfficeIcon}
        label={t('cycles:fields.branch')}
        value={cycle.branchId}
      />
      <DetailFieldItem
        icon={CalendarIcon}
        label={t('cycles:fields.startDate')}
        value={formatDate(cycle.startDate)}
      />
      <DetailFieldItem
        icon={HashIcon}
        label={t('cycles:fields.sessionCount')}
        value={cycle.sessionCount}
      />
      <DetailFieldItem
        icon={CalendarXIcon}
        label={t('cycles:fields.createdAt')}
        value={formatDate(cycle.createdAt, projectConfig.time.dateTimeFormat)}
      />
      {cycle.isDeleted && (
        <DetailFieldItem
          icon={CalendarXIcon}
          label={t('cycles:fields.deletedAt')}
          value={formatDate(cycle.deletedAt as string)}
        />
      )}
    </div>
  );
}

export type CycleDetailsProps = {
  cycle: Cycle;
  className?: string;
};
