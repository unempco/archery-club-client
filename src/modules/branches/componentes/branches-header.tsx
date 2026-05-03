import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { CreateBranchDialogTrigger } from '@/modules/branches/componentes/dialogs/create-branch-dialog-trigger';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function BranchesHeader() {
  const { t } = useTranslation();
  const { p } = useAuth();

  return (
    <PageHeader title={t('branches:name')}>
      {p(ApiPermissions.Branches.CREATE) && (
        <CreateBranchDialogTrigger>
          <Button>
            <PlusIcon />
            {t('branches:actions.addNew')}
          </Button>
        </CreateBranchDialogTrigger>
      )}
    </PageHeader>
  );
}
