import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { CreateCycleDialogTrigger } from '@/modules/cycles/componentes/dialogs/create-cycle-dialog-trigger';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function CyclesHeader() {
  const { t } = useTranslation();
  const { p } = useAuth();

  return (
    <PageHeader title={t('cycles:name')}>
      {p(ApiPermissions.Cycles.CREATE) && (
        <CreateCycleDialogTrigger>
          <Button>
            <PlusIcon />
            {t('cycles:actions.addNew')}
          </Button>
        </CreateCycleDialogTrigger>
      )}
    </PageHeader>
  );
}
