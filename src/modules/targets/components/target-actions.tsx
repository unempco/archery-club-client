import type { Target } from '@/modules/targets/types';
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
import { ApiPermissions } from '@/modules/shared/constants/permissions';
import { UpdateTargetDialog } from '@/modules/targets/components/dialogs/update-target-dialog';
import { useDeleteTarget } from '@/modules/targets/hooks/target-actions';

export function TargetActions({ row }: DataActionsProps) {
  const { t } = useTranslation();
  const { hasPermissions } = useAuth();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const target = row.original;

  const deleteMutation = useDeleteTarget({ targetId: target.id });

  if (
    !hasPermissions([
      ApiPermissions.Targets.UPDATE,
      ApiPermissions.Targets.DELETE,
    ])
  )
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
          {hasPermissions(ApiPermissions.Targets.UPDATE) && (
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <PencilIcon />
              {t('actions.edit')}
            </DropdownMenuItem>
          )}
          {hasPermissions(ApiPermissions.Targets.DELETE) && (
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

      <UpdateTargetDialog
        target={target}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
        name={target.name}
      />
    </>
  );
}

export type DataActionsProps = CellContext<Target, unknown> & {};
