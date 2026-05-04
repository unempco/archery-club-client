import type { UpdateTargetFormData } from '@/modules/targets/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { onMutationError } from '@/core/lib/mutation-toast';
import {
  createTarget,
  deleteTarget,
  updateTarget,
} from '@/modules/targets/api/query-fns';

export function useCreateTarget({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createTarget'],
    mutationFn: createTarget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['targets'] });
      onSuccess();
      toast.success(t('targets:dialogs.wasCreated'));
    },
    onError: onMutationError(t),
  });
}

export function useUpdateTarget({
  targetId,
  onSuccess,
}: {
  targetId: number;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateTarget', targetId],
    mutationFn: (data: UpdateTargetFormData) => updateTarget(targetId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['targets'] });
      onSuccess();
      toast.success(t('targets:dialogs.wasUpdated'));
    },
    onError: onMutationError(t),
  });
}

export function useDeleteTarget({ targetId }: { targetId: number }) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: ['deleteTarget', targetId],
    mutationFn: () => deleteTarget(targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['targets'] });
      toast.message(t('targets:dialogs.wasDeleted'));
    },
    onError: onMutationError(t),
  });
}
