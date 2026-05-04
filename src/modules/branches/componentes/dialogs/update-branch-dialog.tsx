// modules/branches/components/update-branch-dialog.tsx
import type { Branch } from '@/modules/branches/types';

import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { UpdateBranchForm } from '@/modules/branches/componentes/forms/update-branch-form';
import { useUpdateBranch } from '@/modules/branches/hooks/branch-actions';

export function UpdateBranchDialog({
  branch,
  open,
  onOpenChange,
}: UpdateBranchDialogProps) {
  const { t } = useTranslation();

  const mutation = useUpdateBranch({
    branchId: branch.id,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('branches:forms.edit.title')}</DialogTitle>
        </DialogHeader>
        <UpdateBranchForm
          defaultValues={branch}
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
          submitLabel={t('actions.update')}
        />
      </DialogContent>
    </Dialog>
  );
}

export type UpdateBranchDialogProps = {
  branch: Branch;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};
