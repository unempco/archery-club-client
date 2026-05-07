// modules/groups/components/update-group-dialog.tsx
import type { Group } from '@/modules/groups/types';

import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { UpdateGroupForm } from '@/modules/groups/components/forms/update-group-form';
import { useUpdateGroup } from '@/modules/groups/hooks/group-actions';

export function UpdateGroupDialog({
  group,
  open,
  onOpenChange,
}: UpdateGroupDialogProps) {
  const { t } = useTranslation();

  const mutation = useUpdateGroup({
    groupId: group.id,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('groups:forms.edit.title')}</DialogTitle>
        </DialogHeader>
        <UpdateGroupForm
          defaultValues={group}
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
          submitLabel={t('actions.update')}
        />
      </DialogContent>
    </Dialog>
  );
}

export type UpdateGroupDialogProps = {
  group: Group;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};
