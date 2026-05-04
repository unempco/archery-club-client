import type { UpdateCycleFormData } from '@/modules/cycles/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { onMutationError } from '@/core/lib/mutation-toast';
import {
  createCycle,
  deleteCycle,
  updateCycle,
} from '@/modules/cycles/api/query-fns';

export function useCreateCycle({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createCycle'],
    mutationFn: createCycle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cycles'] });
      onSuccess();
      toast.success(t('cycles:dialogs.wasCreated'));
    },
    onError: onMutationError(t),
  });
}

export function useUpdateCycle({
  cycleId,
  onSuccess,
}: {
  cycleId: number;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateCycle', cycleId],
    mutationFn: (data: UpdateCycleFormData) => updateCycle(cycleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cycles'] });
      onSuccess();
      toast.success(t('cycles:dialogs.wasUpdated'));
    },
    onError: onMutationError(t),
  });
}

export function useDeleteCycle({ cycleId }: { cycleId: number }) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: ['deleteCycle', cycleId],
    mutationFn: () => deleteCycle(cycleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cycles'] });
      toast.message(t('cycles:dialogs.wasDeleted'));
    },
    onError: onMutationError(t),
  });
}
