import type { GroupSessionsSearchParams } from '@/modules/sessions/types';
import type { VisibilityState } from '@tanstack/react-table';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataPaginator } from '@/core/components/data/data-paginator';
import { DataSearch } from '@/core/components/data/data-search';
import { DataTable } from '@/core/components/data/data-table';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { groupSessionsQueryOptions } from '@/modules/sessions/api/query-options';
import { SessionsHeader } from '@/modules/sessions/components/sessions-header';
import {
  sessionsColumnsDefaultState,
  sessionsTableColumns,
} from '@/modules/sessions/data/data-table-settings';
import { groupSessionsSearchSchema } from '@/modules/sessions/schemas';

export const Route = createFileRoute('/app/groups/$groupId/sessions')({
  validateSearch: groupSessionsSearchSchema,
  loaderDeps: ({ search }): GroupSessionsSearchParams => search,
  loader: async ({ context: { queryClient }, params: { groupId }, deps }) =>
    queryClient.ensureQueryData(groupSessionsQueryOptions(groupId, deps)),
  head: createRouteHead({ type: 'generic', titleI18nKey: 'sessions:name' }),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const search = Route.useSearch();

  const { data } = useSuspenseQuery(
    groupSessionsQueryOptions(params.groupId, search),
  );

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    sessionsColumnsDefaultState,
  );

  return (
    <>
      <SessionsHeader titleVariant="h3" />
      <DataTable
        data={data.items}
        columns={sessionsTableColumns}
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
