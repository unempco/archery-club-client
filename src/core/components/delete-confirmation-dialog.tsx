import { useTranslation } from 'react-i18next';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/core/components/ui/alert-dialog';
import { Spinner } from '@/core/components/ui/spinner';

export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending,
  name,
}: DeleteConfirmationDialogProps) {
  const { t } = useTranslation();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('dialogs.requiredConfirmation')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {`${t('core:dialogs.areYouSureDelete')} (${name})`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t('actions.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending && <Spinner />}
            {t('actions.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export type DeleteConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: () => void;
  isPending?: boolean;
  name?: string;
};
