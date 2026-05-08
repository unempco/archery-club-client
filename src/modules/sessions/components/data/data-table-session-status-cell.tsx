import type { Session } from '@/modules/sessions/types';
import type { CellContext } from '@tanstack/react-table';

import { MinusIcon, ScrewdriverIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { StatusBadge } from '@/core/components/status-badge';
import { Badge } from '@/core/components/ui/badge';
import { convertCase } from '@/core/lib/utils';
import { SessionStatus } from '@/modules/sessions/constants';

export function DateTableSessionStatusCell({
  cell,
}: DataTableSessionStatusCellProps) {
  const { t } = useTranslation();

  const status = convertCase(cell.getValue() as string);

  if (status === SessionStatus.ACTIVE)
    return <StatusBadge status={SessionStatus.ACTIVE} />;

  if (status === SessionStatus.RETIRED)
    return (
      <Badge variant="destructive">
        <MinusIcon />
        {t('sessions:constants.status.retired')}
      </Badge>
    );

  if (status === SessionStatus.UNDER_MAINTENANCE)
    return (
      <Badge variant="outline">
        <ScrewdriverIcon />
        {t('sessions:constants.status.underMaintenance')}
      </Badge>
    );
}

export type DataTableSessionStatusCellProps = CellContext<Session, unknown>;
