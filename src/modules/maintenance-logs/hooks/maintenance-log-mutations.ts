import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { onMutationError } from '@/core/lib/mutation-toast';
import { createMaintenanceLog } from '@/modules/maintenance-logs/api/query-fns';

export function useCreateMaintenanceLogMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createMaintenanceLog'],
    mutationFn: createMaintenanceLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceLogs'] });
      onSuccess();
      toast.success(t('maintenanceLog:messages.wasCreated'));
    },
    onError: onMutationError(t),
  });
}
