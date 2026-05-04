import type { CyclesSearchParams } from '@/modules/cycles/types';

import { queryOptions } from '@tanstack/react-query';

import { getCycleById, getCyclesList } from '@/modules/cycles/api/query-fns';

export const cyclesIndexQueryOptions = (params: CyclesSearchParams) =>
  queryOptions({
    queryKey: ['cycles', params],
    queryFn: () => getCyclesList(params),
  });

export const cycleQueryOptions = (itemId: number) =>
  queryOptions({
    queryKey: ['cycleById', itemId],
    queryFn: () => getCycleById(itemId),
  });
