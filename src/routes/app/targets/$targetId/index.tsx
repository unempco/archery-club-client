import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/app/targets/$targetId/')({
  beforeLoad: () => {
    throw redirect({ to: '/app/targets' });
  },
});
