import type { DummyFormData } from '@/modules/dummies/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { onMutationError } from '@/core/lib/mutation-toast';
import {
  createDummy,
  deleteDummy,
  updateDummy,
} from '@/modules/dummies/api/query-fns';

export function useCreateDummy({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createDummy'],
    mutationFn: createDummy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dummies'] });
      toast.success('actions.wasCreated');
      onSuccess();
    },
    onError: onMutationError(t),
  });
}

export function useUpdateDummy({
  dummyId,
  onSuccess,
}: {
  dummyId: number;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateDummy'],
    mutationFn: (data: DummyFormData) => updateDummy(dummyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dummies'] });
      toast.success('messages.wasUpdated');
      onSuccess();
    },
    onError: onMutationError(t),
  });
}

export function useDeleteDummy({ dummyId }: { dummyId: number }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteDummy'],
    mutationFn: () => deleteDummy(dummyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dummies'] });
      toast.success('messages.wasDeleted');
    },
    onError: onMutationError(t),
  });
}
