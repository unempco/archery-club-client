import { createFileRoute, Outlet } from '@tanstack/react-router';

import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app/targets')({
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'targets:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
