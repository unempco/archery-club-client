import type { Branch } from '@/modules/branches/types';
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
import { UpdateBranchDialog } from '@/modules/branches/components/dialogs/update-branch-dialog';
import { useDeleteBranch } from '@/modules/branches/hooks/branch-actions';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function BranchActions({ row }: DataActionsProps) {
  const { t } = useTranslation();
  const { hasPermissions } = useAuth();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const branch = row.original;

  const deleteMutation = useDeleteBranch({ branchId: branch.id });

  if (
    !hasPermissions([
      ApiPermissions.Branches.UPDATE,
      ApiPermissions.Branches.DELETE,
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
          {hasPermissions(ApiPermissions.Branches.UPDATE) && (
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <PencilIcon />
              {t('actions.edit')}
            </DropdownMenuItem>
          )}
          {hasPermissions(ApiPermissions.Branches.DELETE) && (
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

      <UpdateBranchDialog
        branch={branch}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
        name={branch.name}
      />
    </>
  );
}

export type DataActionsProps = CellContext<Branch, unknown> & {};
