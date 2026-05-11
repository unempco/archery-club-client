import { createFileRoute } from '@tanstack/react-router';

import { UnderConstruction } from '@/layout/components/under-construction';
import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app/settings')({
  head: createRouteHead({
    type: 'generic',
    titleI18nKey: 'layout:navigation.settings',
  }),
  component: UnderConstruction,
});
