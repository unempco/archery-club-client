import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { CreateBranchForm } from '@/modules/branches/components/forms/create-branch-form';
import { useCreateBranchMutation } from '@/modules/branches/hooks/mutations';

export function CreateBranchDialogTrigger({
  children,
}: CreateBranchDialogProps) {
  const { t } = useTranslation();
  const [open, onOpenChange] = useState(false);

  const mutation = useCreateBranchMutation({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('branches:dialogs.create.title')}</DialogTitle>
        </DialogHeader>
        <CreateBranchForm
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
          submitLabel={t('actions.create')}
        />
      </DialogContent>
    </Dialog>
  );
}

export type CreateBranchDialogProps = {
  children: React.ReactNode;
};
