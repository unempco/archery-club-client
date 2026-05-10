import type { Dummy } from '@/modules/dummies/types';

import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { DummyForm } from '@/modules/dummies/components/forms/dummy-form';
import { useUpdateDummyMutation } from '@/modules/dummies/hooks/dummy-mutations';

export function UpdateDummyDialog({
  dummy,
  open,
  onOpenChange,
}: UpdateDummyDialogProps) {
  const { t } = useTranslation();

  const mutation = useUpdateDummyMutation({
    dummyId: dummy.id,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('dummies:actions.edit')}</DialogTitle>
        </DialogHeader>
        <DummyForm
          defaultValues={dummy}
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
          submitLabel={t('actions.update')}
        />
      </DialogContent>
    </Dialog>
  );
}

export type UpdateDummyDialogProps = {
  dummy: Dummy;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};
