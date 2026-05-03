import type { BranchesSearchParams } from '@/modules/branches/types';
import type { VisibilityState } from '@tanstack/react-table';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useSearch } from '@tanstack/react-router';

import { DataPaginator } from '@/core/components/data/data-paginator';
import { DataSearch } from '@/core/components/data/data-search';
import { DataTable } from '@/core/components/data/data-table';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { branchesIndexQueryOptions } from '@/modules/branches/api/query-options';
import { BranchesHeader } from '@/modules/branches/componentes/branches-header';
import {
  branchesColumnsDefaultState,
  branchesTableColumns,
} from '@/modules/branches/data/data-table-settings';
import { branchesSearchSchema } from '@/modules/branches/schemas';

export const Route = createFileRoute('/app/branches/')({
  validateSearch: branchesSearchSchema,
  loaderDeps: ({ search }): BranchesSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(branchesIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'branches:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = useSearch({ from: '/app/branches' });
  const { data } = useSuspenseQuery(branchesIndexQueryOptions(search));

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    branchesColumnsDefaultState,
  );

  return (
    <div className="min-h-full flex flex-col gap-4">
      <BranchesHeader />
      <DataTable
        data={data.items}
        columns={branchesTableColumns}
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
