import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import { createRouteHead } from '@/layout/lib/create-route-head';
import { groupQueryOptions } from '@/modules/groups/api/query-options';
import { GroupDetails } from '@/modules/groups/components/group-details';
import { GroupHeader } from '@/modules/groups/components/group-header';

export const Route = createFileRoute('/app/groups/$groupId')({
  loader: ({ context: { queryClient }, params: { groupId } }) =>
    queryClient.ensureQueryData(groupQueryOptions(Number(groupId))),
  head: createRouteHead({ type: 'item', titleAccessorKey: 'name' }),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: group } = useSuspenseQuery(
    groupQueryOptions(Number(params.groupId)),
  );

  return (
    <div className="min-h-full flex flex-col gap-4">
      <GroupHeader group={group} />
      <GroupDetails group={group} />
      <Outlet />
    </div>
  );
}
