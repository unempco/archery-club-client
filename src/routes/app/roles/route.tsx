import { createFileRoute } from '@tanstack/react-router';

import { UnderConstruction } from '@/layout/components/under-construction';
import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app/roles')({
  head: createRouteHead({ type: 'index', titleI18nKey: 'roles:name' }),
  component: UnderConstruction,
});
//
// function RouteComponent() {
//   return <div>Hello "/app/roles"!</div>
// }
