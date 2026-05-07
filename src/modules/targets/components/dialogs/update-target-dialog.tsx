// modules/targets/components/update-target-dialog.tsx
import type { Target } from '@/modules/targets/types';

import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { UpdateTargetForm } from '@/modules/targets/components/forms/update-target-form';
import { useUpdateTarget } from '@/modules/targets/hooks/target-actions';

export function UpdateTargetDialog({
  target,
  open,
  onOpenChange,
}: UpdateTargetDialogProps) {
  const { t } = useTranslation();

  const mutation = useUpdateTarget({
    targetId: target.id,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('targets:forms.edit.title')}</DialogTitle>
        </DialogHeader>
        <UpdateTargetForm
          defaultValues={target}
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
          submitLabel={t('actions.update')}
        />
      </DialogContent>
    </Dialog>
  );
}

export type UpdateTargetDialogProps = {
  target: Target;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};
