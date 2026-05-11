import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/app/groups/$groupId/')({
  beforeLoad: () => {
    throw redirect({ to: '/app/groups' });
  },
});
