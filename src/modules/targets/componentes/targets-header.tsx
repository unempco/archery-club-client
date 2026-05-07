import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';
import { CreateTargetDialogTrigger } from '@/modules/targets/componentes/dialogs/create-target-dialog-trigger';

export function TargetsHeader() {
  const { t } = useTranslation();
  const { hasPermissions } = useAuth();

  return (
    <PageHeader title={t('targets:name')}>
      {hasPermissions(ApiPermissions.Targets.CREATE) && (
        <CreateTargetDialogTrigger>
          <Button>
            <PlusIcon />
            {t('targets:actions.addNew')}
          </Button>
        </CreateTargetDialogTrigger>
      )}
    </PageHeader>
  );
}
