import type { Group } from '@/modules/groups/types';

import {
  CalendarIcon,
  CalendarXIcon,
  ClockCountdownIcon,
  ClockIcon,
  KanbanIcon,
  PulseIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { StatusBadge } from '@/core/components/status-badge';
import { formatDate } from '@/core/lib/dates';
import { cn } from '@/core/lib/utils';
import { DetailFieldItem } from '@/modules/shared/components/detail-field-item';
import projectConfig from '@/project.config';

export function GroupDetails({ group, className }: GroupDetailsProps) {
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
        label={t('groups:fields.status')}
        value={<StatusBadge status={group.status} />}
      />
      <DetailFieldItem
        icon={KanbanIcon}
        label={t('groups:fields.cycle')}
        value={group.cycleId}
      />
      <DetailFieldItem
        icon={CalendarIcon}
        label={t('groups:fields.weekday')}
        value={t(`groups:constants.weekdays.${group.weekday}`)}
      />
      <DetailFieldItem
        icon={ClockIcon}
        label={t('groups:fields.startTime')}
        value={group.startTime}
      />
      <DetailFieldItem
        icon={ClockCountdownIcon}
        label={t('groups:fields.duration')}
        value={group.durationMinutes}
      />

      <DetailFieldItem
        icon={CalendarXIcon}
        label={t('groups:fields.createdAt')}
        value={formatDate(
          group.createdAt as string,
          projectConfig.time.dateTimeFormat,
        )}
      />
      {group.isDeleted && (
        <DetailFieldItem
          icon={CalendarXIcon}
          label={t('groups:fields.deletedAt')}
          value={formatDate(group.deletedAt as string)}
        />
      )}
    </div>
  );
}

export type GroupDetailsProps = {
  group: Group;
  className?: string;
};
