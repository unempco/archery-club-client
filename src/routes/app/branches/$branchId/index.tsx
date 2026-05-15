import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/app/branches/$branchId/')({
  beforeLoad: () => {
    throw redirect({ to: '/app/branches' });
  },
});
