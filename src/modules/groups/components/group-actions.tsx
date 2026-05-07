import type { Group } from '@/modules/groups/types';
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
import { UpdateGroupDialog } from '@/modules/groups/components/dialogs/update-group-dialog';
import { useDeleteGroup } from '@/modules/groups/hooks/group-actions';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export function GroupActions({ row }: DataActionsProps) {
  const { t } = useTranslation();
  const { hasPermissions } = useAuth();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const group = row.original;

  const deleteMutation = useDeleteGroup({ groupId: group.id });

  if (
    !hasPermissions([
      ApiPermissions.Groups.UPDATE,
      ApiPermissions.Groups.DELETE,
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
          {hasPermissions(ApiPermissions.Groups.UPDATE) && (
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <PencilIcon />
              {t('actions.edit')}
            </DropdownMenuItem>
          )}
          {hasPermissions(ApiPermissions.Groups.DELETE) && (
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

      <UpdateGroupDialog
        group={group}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
        name={group.name}
      />
    </>
  );
}

export type DataActionsProps = CellContext<Group, unknown> & {};
