import type { CycleGroupsSearchParams } from '@/modules/groups/types';
import type { VisibilityState } from '@tanstack/react-table';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataPaginator } from '@/core/components/data/data-paginator';
import { DataSearch } from '@/core/components/data/data-search';
import { DataTable } from '@/core/components/data/data-table';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { cycleGroupsQueryOptions } from '@/modules/groups/api/query-options';
import { GroupsHeader } from '@/modules/groups/components/groups-header';
import {
  groupsColumnsDefaultState,
  groupsTableColumns,
} from '@/modules/groups/data/data-table-settings';
import { cycleGroupsSearchSchema } from '@/modules/groups/schemas';

export const Route = createFileRoute('/app/cycles/$cycleId/groups')({
  validateSearch: cycleGroupsSearchSchema,
  loaderDeps: ({ search }): CycleGroupsSearchParams => search,
  loader: async ({ context: { queryClient }, params: { cycleId }, deps }) =>
    queryClient.ensureQueryData(cycleGroupsQueryOptions(cycleId, deps)),
  head: createRouteHead({ type: 'generic', titleI18nKey: 'groups:name' }),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const search = Route.useSearch();

  const { data } = useSuspenseQuery(
    cycleGroupsQueryOptions(params.cycleId, search),
  );

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    groupsColumnsDefaultState,
  );

  return (
    <>
      <GroupsHeader titleVariant="h3" />
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
    </>
  );
}
