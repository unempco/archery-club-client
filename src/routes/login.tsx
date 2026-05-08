import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

import { createRouteHead } from '@/layout/lib/create-route-head';
import { LoginForm } from '@/modules/auth/components/forms/login-form';
import { useAuthLoginMutation } from '@/modules/auth/hooks/auth-mutations';

const fallback = '/app/dashboard' as const;

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: async ({ context: { auth }, search }) => {
    if (auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  head: createRouteHead({
    type: 'generic',
    titleI18nKey: 'auth:actions.login',
  }),
  component: LoginComponent,
});

function LoginComponent() {
  const loginMutation = useAuthLoginMutation();

  return (
    <main className="bg-muted h-screen w-screen flex flex-col justify-center items-center">
      <LoginForm
        className="w-full max-w-[24rem] animate-in fade-in slide-in-from-top-5 duration-500"
        onSubmit={(data) => loginMutation.mutate(data)}
        isLoading={loginMutation.isPending}
      />
    </main>
  );
}
