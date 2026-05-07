import { useRouteContext } from '@tanstack/react-router';

export function useAuth() {
  const { auth } = useRouteContext({ from: '__root__' });

  if (!auth) {
    throw new Error('useAuth must be used within an RouterProvider');
  }

  return auth;
}
