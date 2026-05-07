import type { Dummy } from '@/modules/dummies/types';
import type { CellContext } from '@tanstack/react-table';

import { useState } from 'react';
import { DotsThreeIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { DeleteConfirmationDialog } from '@/core/components/delete-confirmation-dialog';
import { Button } from '@/core/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { UpdateDummyDialog } from '@/modules/dummies/componentes/dialogs/update-dummy-dialog';
import { useDeleteDummy } from '@/modules/dummies/hooks/dummy-actions';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function DummyActions({ row }: DataActionsProps) {
  const { t } = useTranslation();
  const { p } = useAuth();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const dummy = row.original;
  const deleteMutation = useDeleteDummy({ dummyId: dummy.id });

  if (!p([ApiPermissions.Dummies.UPDATE, ApiPermissions.Dummies.DELETE]))
    return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <DotsThreeIcon weight="bold" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {p(ApiPermissions.Dummies.UPDATE) && (
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <PencilIcon />
              {t('actions.edit')}
            </DropdownMenuItem>
          )}
          {p(ApiPermissions.Dummies.DELETE) && (
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setConfirmOpen(true)}
            >
              <TrashIcon />
              {t('actions.delete')}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateDummyDialog
        dummy={dummy}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
        name={dummy.name}
      />
    </>
  );
}

export type DataActionsProps = CellContext<Dummy, unknown> & {};
