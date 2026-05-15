import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import { createRouteHead } from '@/layout/lib/create-route-head';
import { cycleQueryOptions } from '@/modules/cycles/api/query-options';
import { CycleDetails } from '@/modules/cycles/components/cycle-details';
import { CycleHeader } from '@/modules/cycles/components/cycle-header';

export const Route = createFileRoute('/app/cycles/$cycleId')({
  loader: ({ context: { queryClient }, params: { cycleId } }) =>
    queryClient.ensureQueryData(cycleQueryOptions(Number(cycleId))),
  head: createRouteHead({ type: 'item', titleAccessorKey: 'name' }),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: cycle } = useSuspenseQuery(
    cycleQueryOptions(Number(params.cycleId)),
  );

  return (
    <div className="min-h-full flex flex-col gap-4">
      <CycleHeader cycle={cycle} />
      <CycleDetails cycle={cycle} />
      <Outlet />
    </div>
  );
}
