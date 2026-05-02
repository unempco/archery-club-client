import type { LoginData } from '@/modules/auth/types';

import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { login, logout, verifySession } from '@/modules/auth/api/query-fns';

export const sessionQueryOptions = queryOptions({
  queryKey: ['users', 'me'],
  queryFn: async () => {
    try {
      return await verifySession();
    } catch {
      return null;
    }
  },
  staleTime: Infinity, // don't re-fetch unless explicitly invalidated
  retry: false,
});

export const loginMutationOptions = mutationOptions({
  mutationKey: ['auth', 'login'],
  mutationFn: (loginData: LoginData) => login(loginData),
});

export const logoutMutationOptions = mutationOptions({
  mutationKey: ['auth', 'logout'],
  mutationFn: () => logout(),
});
