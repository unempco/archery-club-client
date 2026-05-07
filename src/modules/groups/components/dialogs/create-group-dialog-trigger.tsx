// modules/groups/components/create-group-dialog.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { CreateGroupForm } from '@/modules/groups/components/forms/create-group-form';
import { useCreateGroup } from '@/modules/groups/hooks/group-actions';

export function CreateGroupDialogTrigger({ children }: CreateGroupDialogProps) {
  const { t } = useTranslation();
  const [open, onOpenChange] = useState(false);

  const mutation = useCreateGroup({ onSuccess: () => onOpenChange(false) });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('groups:forms.add.title')}</DialogTitle>
        </DialogHeader>
        <CreateGroupForm
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

export type CreateGroupDialogProps = {
  children: React.ReactNode;
};
