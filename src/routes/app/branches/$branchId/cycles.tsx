import type { BranchCyclesSearchParams } from '@/modules/cycles/types';
import type { VisibilityState } from '@tanstack/react-table';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataPaginator } from '@/core/components/data/data-paginator';
import { DataSearch } from '@/core/components/data/data-search';
import { DataTable } from '@/core/components/data/data-table';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { branchCyclesQueryOptions } from '@/modules/cycles/api/query-options';
import { CyclesHeader } from '@/modules/cycles/components/cycles-header';
import {
  cyclesColumnsDefaultState,
  cyclesTableColumns,
} from '@/modules/cycles/data/data-table-settings';
import { branchCyclesSearchSchema } from '@/modules/cycles/schemas';

export const Route = createFileRoute('/app/branches/$branchId/cycles')({
  validateSearch: branchCyclesSearchSchema,
  loaderDeps: ({ search }): BranchCyclesSearchParams => search,
  loader: async ({ context: { queryClient }, params: { branchId }, deps }) =>
    queryClient.ensureQueryData(branchCyclesQueryOptions(branchId, deps)),
  head: createRouteHead({ type: 'generic', titleI18nKey: 'cycles:name' }),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const search = Route.useSearch();

  const { data } = useSuspenseQuery(
    branchCyclesQueryOptions(params.branchId, search),
  );

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    cyclesColumnsDefaultState,
  );

  return (
    <>
      <CyclesHeader titleVariant="h3" />
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
    </>
  );
}
