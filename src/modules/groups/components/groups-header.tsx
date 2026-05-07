import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { CreateGroupDialogTrigger } from '@/modules/groups/components/dialogs/create-group-dialog-trigger';
import { PageHeader } from '@/modules/shared/components/page-header';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function GroupsHeader() {
  const { t } = useTranslation();
  const { hasPermissions } = useAuth();

  return (
    <PageHeader title={t('groups:name')}>
      {hasPermissions(ApiPermissions.Groups.CREATE) && (
        <CreateGroupDialogTrigger>
          <Button>
            <PlusIcon />
            {t('groups:actions.addNew')}
          </Button>
        </CreateGroupDialogTrigger>
      )}
    </PageHeader>
  );
}
