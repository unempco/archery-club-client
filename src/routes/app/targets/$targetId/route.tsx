import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import { Separator } from '@/core/components/ui/separator';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { targetQueryOptions } from '@/modules/targets/api/query-options';
import { TargetDetail } from '@/modules/targets/components/target-detail';
import { TargetHeader } from '@/modules/targets/components/target-header';

export const Route = createFileRoute('/app/targets/$targetId')({
  loader: ({ context: { queryClient }, params: { targetId } }) =>
    queryClient.ensureQueryData(targetQueryOptions(Number(targetId))),
  head: createRouteHead({
    type: 'item',
    titleAccessorKey: 'name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { targetId } = Route.useParams();

  const { data: target } = useSuspenseQuery(
    targetQueryOptions(Number(targetId)),
  );

  return (
    <div className="min-h-full flex flex-col gap-4">
      <TargetHeader target={target} />
      <TargetDetail target={target} />
      <Separator />
      <Outlet />
    </div>
  );
}
