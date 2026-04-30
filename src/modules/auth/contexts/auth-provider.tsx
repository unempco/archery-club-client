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

  const checkPermissions: ValidatorFunction = (permissions, logic = 'or') => {
    if (!permissions) return true;

    if (typeof permissions === 'string')
      return Boolean(user?.permissions.includes(permissions));

    if (logic === 'or')
      return Boolean(user?.permissions.some((p) => permissions.includes(p)));

    if (logic === 'and')
      return permissions.every((p) => user?.permissions.includes(p));

    return false;
  };

  const checkRoles: ValidatorFunction = (roles, logic = 'or') => {
    if (!roles) return true;

    if (typeof roles === 'string')
      return Boolean(user?.permissions.includes(roles));

    if (logic === 'or')
      return Boolean(user?.permissions.some((p) => roles.includes(p)));

    if (logic === 'and')
      return roles.every((p) => user?.permissions.includes(p));

    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: Boolean(user),
        login: loginMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
        p: checkPermissions,
        r: checkRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

type ValidatorFunction = (
  requirements?: string[] | string,
  logic?: 'or' | 'and',
) => boolean;

export type AuthContextValue = {
  isAuthenticated: boolean;
  user: User | null;
  login: (data: LoginData) => Promise<User>;
  logout: () => Promise<void>;
  p: ValidatorFunction;
  r: ValidatorFunction;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
