import type { Cycle } from '@/modules/cycles/types';

import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { UpdateCycleForm } from '@/modules/cycles/components/forms/update-cycle-form';
import { useUpdateCycleMutation } from '@/modules/cycles/hooks/mutations';

export function UpdateCycleDialog({
  cycle,
  open,
  onOpenChange,
}: UpdateCycleDialogProps) {
  const { t } = useTranslation();

  const mutation = useUpdateCycleMutation({
    cycleId: cycle.id,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('cycles:dialogs.update.title')}</DialogTitle>
        </DialogHeader>
        <UpdateCycleForm
          defaultValues={cycle}
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
          submitLabel={t('actions.update')}
        />
      </DialogContent>
    </Dialog>
  );
}

export type UpdateCycleDialogProps = {
  cycle: Cycle;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};
