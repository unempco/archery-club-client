import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import { createRouteHead } from '@/layout/lib/create-route-head';
import { branchQueryOptions } from '@/modules/branches/api/query-options';
import { BranchDetails } from '@/modules/branches/components/branch-details';
import { BranchHeader } from '@/modules/branches/components/branch-header';

export const Route = createFileRoute('/app/branches/$branchId')({
  loader: ({ context: { queryClient }, params: { branchId } }) =>
    queryClient.ensureQueryData(branchQueryOptions(Number(branchId))),
  head: createRouteHead({ type: 'item', titleAccessorKey: 'name' }),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: branch } = useSuspenseQuery(
    branchQueryOptions(Number(params.branchId)),
  );

  return (
    <div className="min-h-full flex flex-col gap-4">
      <BranchHeader branch={branch} />
      <BranchDetails branch={branch} />
      <Outlet />
    </div>
  );
}
