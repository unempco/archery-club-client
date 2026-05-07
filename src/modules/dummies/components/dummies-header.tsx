import type { Dummy } from '@/modules/dummies/types';

import { FolderPlusIcon, PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button } from '@/core/components/ui/button';
import { PermissionGuard } from '@/modules/auth/components/permissions-guard';
import { CreateDummyDialogTrigger } from '@/modules/dummies/components/dialogs/create-dummy-dialog-trigger';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function DummiesHeader({ selectedItems }: DummiesHeaderProps) {
  const { t } = useTranslation();

  return (
    <PageHeader title={t('dummies:name')}>
      <PermissionGuard permissions={ApiPermissions.Dummies.CREATE}>
        <CreateDummyDialogTrigger>
          <Button>
            <PlusIcon />
            {t('dummies:actions.addNew')}
          </Button>
        </CreateDummyDialogTrigger>
      </PermissionGuard>
      <Button
        variant="secondary"
        size="icon"
        disabled={!selectedItems?.length}
        onClick={() => {
          toast.info(
            'Selected items: ' + selectedItems.map((d) => d.name).join(', '),
          );
          console.log(selectedItems);
        }}
      >
        <FolderPlusIcon />
      </Button>
    </PageHeader>
  );
}

export type DummiesHeaderProps = {
  selectedItems: Dummy[];
};
