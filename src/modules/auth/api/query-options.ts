import type { LoginData } from '@/modules/auth/types';

import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { login, logout, verifySession } from '@/modules/auth/api/query-fns';
import {
  getUserToken,
  removeUserToken,
  setUserToken,
} from '@/modules/auth/lib/token';

export const sessionQueryOptions = queryOptions({
  queryKey: ['auth', 'session'],
  queryFn: async () => {
    const token = getUserToken();
    if (!token) return null;
    try {
      return await verifySession(token);
    } catch {
      removeUserToken();
      return null;
    }
  },
  staleTime: Infinity, // don't re-fetch unless explicitly invalidated
  retry: false,
});

export const loginMutationOptions = mutationOptions({
  mutationFn: async (loginData: LoginData) => {
    const user = await login(loginData);
    setUserToken(user.token);
    return user;
  },
});

export const logoutMutationOptions = mutationOptions({
  mutationFn: async () => {
    await logout();
    removeUserToken();
  },
});
