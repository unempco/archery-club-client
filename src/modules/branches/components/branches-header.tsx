import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { CreateBranchDialogTrigger } from '@/modules/branches/components/dialogs/create-branch-dialog-trigger';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function BranchesHeader() {
  const { t } = useTranslation();

  return (
    <PageHeader title={t('branches:name')}>
      <PermissionGuard permissions={ApiPermissions.Branches.CREATE}>
        <CreateBranchDialogTrigger>
          <Button>
            <PlusIcon />
            {t('branches:actions.addNew')}
          </Button>
        </CreateBranchDialogTrigger>
      </PermissionGuard>
    </PageHeader>
  );
}
