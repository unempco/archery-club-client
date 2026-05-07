import type { Cycle } from '@/modules/cycles/types';
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
import { UpdateCycleDialog } from '@/modules/cycles/components/dialogs/update-cycle-dialog';
import { useDeleteCycleMutation } from '@/modules/cycles/hooks/cycle-mutations';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function CycleActions({ row }: DataActionsProps) {
  const { t } = useTranslation();
  const { hasPermissions } = useAuth();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const cycle = row.original;

  const deleteMutation = useDeleteCycleMutation({ cycleId: cycle.id });

  if (
    !hasPermissions([
      ApiPermissions.Cycles.UPDATE,
      ApiPermissions.Cycles.DELETE,
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
          {hasPermissions(ApiPermissions.Cycles.UPDATE) && (
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <PencilIcon />
              {t('actions.edit')}
            </DropdownMenuItem>
          )}
          {hasPermissions(ApiPermissions.Cycles.DELETE) && (
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

      <UpdateCycleDialog
        cycle={cycle}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
        name={cycle.name}
      />
    </>
  );
}

export type DataActionsProps = CellContext<Cycle, unknown> & {};
