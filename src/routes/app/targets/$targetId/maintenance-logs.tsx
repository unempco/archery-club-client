import type { MaintenanceLogsSearchParams } from '@/modules/maintenance-logs/types';
import type { VisibilityState } from '@tanstack/react-table';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataPaginator } from '@/core/components/data/data-paginator';
import { DataTable } from '@/core/components/data/data-table';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { targetMaintenanceLogsQueryOptions } from '@/modules/maintenance-logs/api/query-options';
import { TargetMaintenanceLogsHeader } from '@/modules/maintenance-logs/componentes/target-maintenance-logs-header';
import {
  maintenanceLogsColumnsDefaultState,
  maintenanceLogsTableColumns,
} from '@/modules/maintenance-logs/data/data-table-settings';
import { maintenanceLogsSearchSchema } from '@/modules/maintenance-logs/schemas';

export const Route = createFileRoute('/app/targets/$targetId/maintenance-logs')(
  {
    validateSearch: maintenanceLogsSearchSchema,
    loaderDeps: ({ search }): MaintenanceLogsSearchParams => search,
    loader: ({ context: { queryClient }, params: { targetId }, deps }) =>
      queryClient.ensureQueryData(
        targetMaintenanceLogsQueryOptions(Number(targetId), deps),
      ),
    head: createRouteHead({
      type: 'index',
      titleI18nKey: 'maintenanceLogs:name',
    }),
    component: RouteComponent,
  },
);

function RouteComponent() {
  const params = Route.useParams();
  const search = Route.useSearch();

  const { data } = useSuspenseQuery(
    targetMaintenanceLogsQueryOptions(Number(params.targetId), search),
  );

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    maintenanceLogsColumnsDefaultState,
  );

  return (
    <div className="contents">
      <TargetMaintenanceLogsHeader />
      <DataTable
        data={data.items}
        columns={maintenanceLogsTableColumns}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
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
