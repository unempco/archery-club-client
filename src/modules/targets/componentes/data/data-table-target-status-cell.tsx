import type { Target } from '@/modules/targets/types';
import type { CellContext } from '@tanstack/react-table';

import { MinusIcon, ScrewdriverIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { StatusBadge } from '@/core/components/status-badge';
import { Badge } from '@/core/components/ui/badge';
import { convertCase } from '@/core/lib/utils';
import { TargetStatus } from '@/modules/targets/constants';

export function DateTableTargetStatusCell({
  cell,
}: DataTableTargetStatusCellProps) {
  const { t } = useTranslation();

  const status = convertCase(cell.getValue() as string);

  if (status === TargetStatus.ACTIVE)
    return <StatusBadge status={TargetStatus.ACTIVE} />;

  if (status === TargetStatus.RETIRED)
    return (
      <Badge variant="destructive">
        <MinusIcon />
        {t('targets:constants.status.retired')}
      </Badge>
    );

  if (status === TargetStatus.UNDER_MAINTENANCE)
    return (
      <Badge variant="outline">
        <ScrewdriverIcon />
        {t('targets:constants.status.underMaintenance')}
      </Badge>
    );
}

export type DataTableTargetStatusCellProps = CellContext<Target, unknown>;
