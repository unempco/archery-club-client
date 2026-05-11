import type { GroupsSearchParams } from '@/modules/groups/types';
import type { VisibilityState } from '@tanstack/react-table';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataPaginator } from '@/core/components/data/data-paginator';
import { DataSearch } from '@/core/components/data/data-search';
import { DataTable } from '@/core/components/data/data-table';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { groupsIndexQueryOptions } from '@/modules/groups/api/query-options';
import { GroupsHeader } from '@/modules/groups/components/groups-header';
import {
  groupsColumnsDefaultState,
  groupsTableColumns,
} from '@/modules/groups/data/data-table-settings';
import { groupsSearchSchema } from '@/modules/groups/schemas';

export const Route = createFileRoute('/app/groups/')({
  validateSearch: groupsSearchSchema,
  loaderDeps: ({ search }): GroupsSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(groupsIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'groups:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(groupsIndexQueryOptions(search));

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    groupsColumnsDefaultState,
  );

  return (
    <div className="min-h-full flex flex-col gap-4">
      <GroupsHeader />
      <DataTable
        data={data.items}
        columns={groupsTableColumns}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        headerSlot={<DataSearch />}
      />
      <DataPaginator
        className="mt-auto"
        currentPage={search.page}
        pageSize={search.pageSize}
        totalItems={data.meta.totalItems}
      />
    </div>
  );
}
