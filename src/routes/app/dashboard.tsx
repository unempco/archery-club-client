import { createFileRoute } from '@tanstack/react-router';

import { UnderConstruction } from '@/layout/components/under-construction';
import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app/dashboard')({
  component: UnderConstruction,
  head: createRouteHead({
    type: 'generic',
    titleI18nKey: 'layout:navigation.dashboard',
  }),
});
