import { createFileRoute } from '@tanstack/react-router';

import { UnderConstruction } from '@/layout/components/under-construction';
import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app/dashboard')({
  component: UnderConstruction,
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'layout:navigation.dashboard',
  }),
});

// function DashboardPage() {
//   const { user } = useAuth();
//
//   return (
//     <section className="grid gap-2 p-2">
//       <p>Hi {user?.username}!</p>
//       <p>You are currently on the dashboard route.</p>
//     </section>
//   );
// }
