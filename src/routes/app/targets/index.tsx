import type { TargetsSearchParams } from '@/modules/targets/types';
import type { VisibilityState } from '@tanstack/react-table';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useSearch } from '@tanstack/react-router';

import { DataPaginator } from '@/core/components/data/data-paginator';
import { DataSearch } from '@/core/components/data/data-search';
import { DataTable } from '@/core/components/data/data-table';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { targetsIndexQueryOptions } from '@/modules/targets/api/query-options';
import { TargetsHeader } from '@/modules/targets/componentes/targets-header';
import {
  targetsColumnsDefaultState,
  targetsTableColumns,
} from '@/modules/targets/data/data-table-settings';
import { targetsSearchSchema } from '@/modules/targets/schemas';

export const Route = createFileRoute('/app/targets/')({
  validateSearch: targetsSearchSchema,
  loaderDeps: ({ search }): TargetsSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(targetsIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'targets:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = useSearch({ from: '/app/targets' });
  const { data } = useSuspenseQuery(targetsIndexQueryOptions(search));

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    targetsColumnsDefaultState,
  );

  return (
    <div className="min-h-full flex flex-col gap-4">
      <TargetsHeader />
      <DataTable
        data={data.items}
        columns={targetsTableColumns}
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
