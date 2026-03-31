import type { LoginData, User } from '@/modules/auth/types';

import { createContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  loginMutationOptions,
  logoutMutationOptions,
  sessionQueryOptions,
} from '@/modules/auth/api/query-options';

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const { data: user } = useQuery(sessionQueryOptions);

  const loginMutation = useMutation({
    ...loginMutationOptions,
    onSuccess: (user) => {
      queryClient.setQueryData(sessionQueryOptions.queryKey, user); // instant, no refetch
    },
  });

  const logoutMutation = useMutation({
    ...logoutMutationOptions,
    onSuccess: () => {
      queryClient.setQueryData(sessionQueryOptions.queryKey, null);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: Boolean(user),
        login: loginMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export type AuthContextValue = {
  isAuthenticated: boolean;
  user: User | null;
  login: (data: LoginData) => Promise<User>;
  logout: () => Promise<void>;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
