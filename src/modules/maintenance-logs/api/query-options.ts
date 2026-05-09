import type { MaintenanceLogsSearchParams } from '@/modules/maintenance-logs/types';

import { queryOptions } from '@tanstack/react-query';

import { getTargetMaintenanceLogs } from '@/modules/maintenance-logs/api/query-fns';

export const targetMaintenanceLogsQueryOptions = (
  targetId: number,
  params: MaintenanceLogsSearchParams,
) =>
  queryOptions({
    queryKey: ['maintenanceLogs', targetId, params],
    queryFn: () => getTargetMaintenanceLogs(targetId, params),
  });
