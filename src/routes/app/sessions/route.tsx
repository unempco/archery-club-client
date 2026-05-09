import { createFileRoute, Outlet } from '@tanstack/react-router';

import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app/sessions')({
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'sessions:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
