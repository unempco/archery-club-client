import type { Session } from '@/modules/sessions/types';

import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { UpdateSessionForm } from '@/modules/sessions/components/forms/update-target-form';
import { useUpdateSessionMutation } from '@/modules/sessions/hooks/session-mutations';

export function UpdateSessionDialog({
  session,
  open,
  onOpenChange,
}: UpdateSessionDialogProps) {
  const { t } = useTranslation();

  const mutation = useUpdateSessionMutation({
    sessionId: session.id,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('sessions:dialogs.update.title')}</DialogTitle>
        </DialogHeader>
        <UpdateSessionForm
          defaultValues={session}
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
          submitLabel={t('actions.update')}
        />
      </DialogContent>
    </Dialog>
  );
}

export type UpdateSessionDialogProps = {
  session: Session;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};
