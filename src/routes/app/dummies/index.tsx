import type { DummiesSearchParams, Dummy } from '@/modules/dummies/types';
import type { VisibilityState } from '@tanstack/react-table';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataPaginator } from '@/core/components/data/data-paginator';
import { DataSearch } from '@/core/components/data/data-search';
import { DataTable } from '@/core/components/data/data-table';
import { NotOkResponseError } from '@/core/errors';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { dummiesIndexQueryOptions } from '@/modules/dummies/api/query-options';
import { DummiesHeader } from '@/modules/dummies/components/dummies-header';
import {
  dummiesColumnsDefaultState,
  dummiesTableColumns,
} from '@/modules/dummies/data/data-table-settings';
import { dummiesSearchSchema } from '@/modules/dummies/schemas';
import { ApiPermissions } from '@/modules/shared/constants/permissions';

export const Route = createFileRoute('/app/dummies/')({
  validateSearch: dummiesSearchSchema,
  beforeLoad: ({ context: { auth } }) => {
    // Just an example, maybe your query functions should throw a 403
    if (!auth.hasPermissions(ApiPermissions.Dummies.READ)) {
      throw new NotOkResponseError({
        detail: 'You dont belong here',
        title: 'Forbidden',
        status: 403,
      });
    }
  },
  loaderDeps: ({ search }): DummiesSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(dummiesIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'dummies:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(dummiesIndexQueryOptions(search));

  // Should be part of columns settings schema
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    dummiesColumnsDefaultState,
  );

  const [selectedItems, setSelectedItems] = useState<Dummy[]>([]);

  return (
    <div className="min-h-full flex flex-col gap-4">
      <DummiesHeader selectedItems={selectedItems} />
      <DataTable
        data={data.items}
        columns={dummiesTableColumns}
        columnVisibility={columnVisibility}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
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
