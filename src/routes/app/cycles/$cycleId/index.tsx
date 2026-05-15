import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/app/cycles/$cycleId/')({
  beforeLoad: () => {
    throw redirect({ to: '/app/cycles' });
  },
});
