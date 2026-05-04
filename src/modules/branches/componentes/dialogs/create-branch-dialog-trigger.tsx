// modules/branches/components/create-branch-dialog.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { CreateBranchForm } from '@/modules/branches/componentes/forms/create-branch-form';
import { useCreateBranch } from '@/modules/branches/hooks/branch-actions';

export function CreateBranchDialogTrigger({
  children,
}: CreateBranchDialogProps) {
  const { t } = useTranslation();
  const [open, onOpenChange] = useState(false);

  const mutation = useCreateBranch({ onSuccess: () => onOpenChange(false) });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('branches:forms.add.title')}</DialogTitle>
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
