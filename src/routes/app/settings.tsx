import { createFileRoute } from '@tanstack/react-router';

import { UnderConstruction } from '@/layout/components/under-construction';
import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app/settings')({
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'layout:navigation.settings',
  }),
  component: UnderConstruction,
});

// function RouteComponent() {
//   return <div>Hello "/app/settings"!</div>;
// }
