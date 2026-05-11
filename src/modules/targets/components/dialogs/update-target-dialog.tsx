import type { Target } from '@/modules/targets/types';

import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { UpdateTargetForm } from '@/modules/targets/components/forms/update-target-form';
import { useUpdateTargetMutation } from '@/modules/targets/hooks/mutations';

export function UpdateTargetDialog({
  target,
  open,
  onOpenChange,
}: UpdateTargetDialogProps) {
  const { t } = useTranslation();

  const mutation = useUpdateTargetMutation({
    targetId: target.id,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('targets:dialogs.update.title')}</DialogTitle>
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
