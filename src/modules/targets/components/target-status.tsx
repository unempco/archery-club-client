import { MinusIcon, ScrewdriverIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { StatusBadge } from '@/core/components/status-badge';
import { Badge } from '@/core/components/ui/badge';
import { convertCase } from '@/core/lib/utils';
import { TargetStatus } from '@/modules/targets/constants';

export function TargetStatusBadge({ status }: TargetStatusBadgeProps) {
  const { t } = useTranslation();

  const parsedStatus = convertCase(status);

  if (parsedStatus === TargetStatus.RETIRED)
    return (
      <Badge variant="destructive">
        <MinusIcon />
        {t('targets:constants.status.retired')}
      </Badge>
    );

  if (parsedStatus === TargetStatus.UNDER_MAINTENANCE)
    return (
      <Badge variant="outline">
        <ScrewdriverIcon />
        {t('targets:constants.status.underMaintenance')}
      </Badge>
    );

  return <StatusBadge status={status} />;
}

export type TargetStatusBadgeProps = {
  status: string | TargetStatus;
};
