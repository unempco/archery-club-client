// modules/targets/components/create-target-dialog.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { CreateTargetForm } from '@/modules/targets/components/forms/create-target-form';
import { useCreateTarget } from '@/modules/targets/hooks/target-actions';

export function CreateTargetDialogTrigger({
  children,
}: CreateTargetDialogProps) {
  const { t } = useTranslation();
  const [open, onOpenChange] = useState(false);

  const mutation = useCreateTarget({ onSuccess: () => onOpenChange(false) });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('targets:forms.add.title')}</DialogTitle>
        </DialogHeader>
        <CreateTargetForm
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

export type CreateTargetDialogProps = {
  children: React.ReactNode;
};
