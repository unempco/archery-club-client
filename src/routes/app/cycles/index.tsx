import type { CyclesSearchParams } from '@/modules/cycles/types';
import type { VisibilityState } from '@tanstack/react-table';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataPaginator } from '@/core/components/data/data-paginator';
import { DataSearch } from '@/core/components/data/data-search';
import { DataTable } from '@/core/components/data/data-table';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { cyclesIndexQueryOptions } from '@/modules/cycles/api/query-options';
import { CyclesHeader } from '@/modules/cycles/components/cycles-header';
import {
  cyclesColumnsDefaultState,
  cyclesTableColumns,
} from '@/modules/cycles/data/data-table-settings';
import { cyclesSearchSchema } from '@/modules/cycles/schemas';

export const Route = createFileRoute('/app/cycles/')({
  validateSearch: cyclesSearchSchema,
  loaderDeps: ({ search }): CyclesSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(cyclesIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'cycles:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(cyclesIndexQueryOptions(search));

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    cyclesColumnsDefaultState,
  );

  return (
    <div className="min-h-full flex flex-col gap-4">
      <CyclesHeader />
      <DataTable
        data={data.items}
        columns={cyclesTableColumns}
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
