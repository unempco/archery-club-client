import type { GroupsSearchParams } from '@/modules/groups/types';

import { queryOptions } from '@tanstack/react-query';

import { getGroupById, getGroupsList } from '@/modules/groups/api/query-fns';

export const groupsIndexQueryOptions = (params: GroupsSearchParams) =>
  queryOptions({
    queryKey: ['groups', params],
    queryFn: () => getGroupsList(params),
  });

export const groupQueryOptions = (itemId: number) =>
  queryOptions({
    queryKey: ['groupById', itemId],
    queryFn: () => getGroupById(itemId),
  });
