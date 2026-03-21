import type { PaginationParams } from '@/core/types/api';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';

import { DataTable } from '@/core/components/data-table';
import { Paginator } from '@/core/components/paginator';
import { paginationParamsSchema } from '@/core/types/api';
import { dummiesQueryOptions } from '@/modules/dummies/api/query-options';
import {
  dummiesColumnsDefaultState,
  dummiesTableColumns,
} from '@/modules/dummies/data/data-table-settings';

export const Route = createFileRoute('/app/dummies/')({
  validateSearch: paginationParamsSchema,
  loaderDeps: ({ search: { page, pageSize } }) => ({ page, pageSize }),
  loader: async ({ context: { queryClient }, deps: { page, pageSize } }) =>
    queryClient.ensureQueryData(dummiesQueryOptions({ page, pageSize })),
  component: RouteComponent,
});

function RouteComponent() {
  const pagination = useSearch({ from: '/app/dummies/' });
  const navigate = useNavigate({ from: '/app/dummies/' });
  const { data } = useSuspenseQuery(dummiesQueryOptions(pagination));

  // Should be part of columns settings schema
  const [columnVisibility, setColumnVisibility] = useState(
    dummiesColumnsDefaultState,
  );

  function setPagination(updates: Partial<PaginationParams>) {
    navigate({
      search: (prev) => ({ ...prev, ...updates }),
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <DataTable
        data={data.items}
        columns={dummiesTableColumns}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
      />
      <Paginator
        currentPage={pagination.page}
        pageSize={pagination.pageSize}
        totalItems={data.meta.total}
        setPage={(page) => setPagination({ page })}
        setPageSize={(pageSize) => setPagination({ pageSize, page: 1 })}
      />
    </div>
  );
}
