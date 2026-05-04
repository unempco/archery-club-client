// modules/cycles/components/create-cycle-dialog.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { CreateCycleForm } from '@/modules/cycles/componentes/forms/create-cycle-form';
import { useCreateCycle } from '@/modules/cycles/hooks/cycle-actions';

export function CreateCycleDialogTrigger({ children }: CreateCycleDialogProps) {
  const { t } = useTranslation();
  const [open, onOpenChange] = useState(false);

  const mutation = useCreateCycle({ onSuccess: () => onOpenChange(false) });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('cycles:forms.add.title')}</DialogTitle>
        </DialogHeader>
        <CreateCycleForm
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

export type CreateCycleDialogProps = {
  children: React.ReactNode;
};
