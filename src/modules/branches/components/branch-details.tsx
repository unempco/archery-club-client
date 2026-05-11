import type { Branch } from '@/modules/branches/types';

import {
  CalendarXIcon,
  GaugeIcon,
  PulseIcon,
  WarningIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { StatusBadge } from '@/core/components/status-badge';
import { formatDate } from '@/core/lib/dates';
import { cn } from '@/core/lib/utils';
import { BranchStatus } from '@/modules/branches/constants';
import { DetailFieldItem } from '@/modules/shared/components/detail-field-item';
import projectConfig from '@/project.config';

export function BranchDetails({ branch, className }: BranchDetailsProps) {
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
        label={t('branches:fields.status')}
        value={<StatusBadge status={branch.status} />}
      />
      <DetailFieldItem
        icon={GaugeIcon}
        label={t('branches:fields.maintenanceThreshold')}
        value={branch.maintenanceThreshold}
      />
      <DetailFieldItem
        icon={WarningIcon}
        label={t('branches:fields.maintenanceWarningOffset')}
        value={branch.maintenanceWarningOffset}
      />
      <DetailFieldItem
        icon={CalendarXIcon}
        label={t('branches:fields.createdAt')}
        value={formatDate(
          branch.createdAt as string,
          projectConfig.time.dateTimeFormat,
        )}
      />
      {branch.status === BranchStatus.CLOSED && (
        <DetailFieldItem
          icon={PulseIcon}
          label={t('branches:fields.closedAt')}
          value={<StatusBadge status={branch.status} />}
        />
      )}
      {branch.isDeleted && (
        <DetailFieldItem
          icon={CalendarXIcon}
          label={t('branches:fields.deletedAt')}
          value={formatDate(
            branch.deletedAt as string,
            projectConfig.time.dateTimeFormat,
          )}
        />
      )}
    </div>
  );
}

export type BranchDetailsProps = {
  branch: Branch;
  className?: string;
};
