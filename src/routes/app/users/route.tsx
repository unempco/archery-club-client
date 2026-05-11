import { createFileRoute } from '@tanstack/react-router';

import { UnderConstruction } from '@/layout/components/under-construction';
import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app/users')({
  head: createRouteHead({ type: 'index', titleI18nKey: 'users:name' }),
  component: UnderConstruction,
});
