import { createFileRoute } from '@tanstack/react-router';

import { UnderConstruction } from '@/layout/components/under-construction';

export const Route = createFileRoute('/app/maintenance-logs')({
  component: UnderConstruction,
});
