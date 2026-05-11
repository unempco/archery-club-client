import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { CreateCycleForm } from '@/modules/cycles/components/forms/create-cycle-form';
import { useCreateCycleMutation } from '@/modules/cycles/hooks/mutations';

export function CreateCycleDialogTrigger({ children }: CreateCycleDialogProps) {
  const { t } = useTranslation();
  const { branchId } = useParams({ strict: false });

  const [open, onOpenChange] = useState(false);

  const mutation = useCreateCycleMutation({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('cycles:dialogs.create.title')}</DialogTitle>
        </DialogHeader>
        <CreateCycleForm
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
          defaultValues={{ branchId }}
        />
      </DialogContent>
    </Dialog>
  );
}

export type CreateCycleDialogProps = {
  children: React.ReactNode;
};
