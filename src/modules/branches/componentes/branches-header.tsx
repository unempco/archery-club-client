import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { CreateBranchDialogTrigger } from '@/modules/branches/componentes/dialogs/create-branch-dialog-trigger';
import { PageHeader } from '@/modules/shared/components/page-header';

export function BranchesHeader() {
  const { t } = useTranslation();

  return (
    <PageHeader title={t('branches:name')}>
      <CreateBranchDialogTrigger>
        <Button>
          <PlusIcon />
          {t('branches:actions.addNew')}
        </Button>
      </CreateBranchDialogTrigger>
    </PageHeader>
  );
}
