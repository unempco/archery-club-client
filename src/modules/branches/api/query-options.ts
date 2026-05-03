import type { BranchesSearchParams } from '@/modules/branches/types';

import { queryOptions } from '@tanstack/react-query';

import {
  getBranchById,
  getBranchesList,
} from '@/modules/branches/api/query-fns';

export const branchesIndexQueryOptions = (params: BranchesSearchParams) =>
  queryOptions({
    queryKey: ['branches', params],
    queryFn: () => getBranchesList(params),
  });

export const branchQueryOptions = (itemId: number) =>
  queryOptions({
    queryKey: ['branchById', itemId],
    queryFn: () => getBranchById(itemId),
  });
