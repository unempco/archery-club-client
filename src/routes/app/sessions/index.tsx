import type { SessionsSearchParams } from '@/modules/sessions/types';
import type { VisibilityState } from '@tanstack/react-table';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useSearch } from '@tanstack/react-router';

import { DataPaginator } from '@/core/components/data/data-paginator';
import { DataSearch } from '@/core/components/data/data-search';
import { DataTable } from '@/core/components/data/data-table';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { sessionsIndexQueryOptions } from '@/modules/sessions/api/query-options';
import { SessionsHeader } from '@/modules/sessions/components/sessions-header';
import {
  sessionsColumnsDefaultState,
  sessionsTableColumns,
} from '@/modules/sessions/data/data-table-settings';
import { sessionsSearchSchema } from '@/modules/sessions/schemas';

export const Route = createFileRoute('/app/sessions/')({
  validateSearch: sessionsSearchSchema,
  loaderDeps: ({ search }): SessionsSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(sessionsIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'sessions:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = useSearch({ from: '/app/sessions' });
  const { data } = useSuspenseQuery(sessionsIndexQueryOptions(search));

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    sessionsColumnsDefaultState,
  );

  return (
    <div className="min-h-full flex flex-col gap-4">
      <SessionsHeader />
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
    </div>
  );
}
