import type { LoginData, User } from '@/modules/auth/types';

import { sleep } from '@/core/lib/utils';

export async function login(data: LoginData): Promise<User> {
  await sleep(500);

  if (data.email === 'admin@example.com' && data.password === 'adminadmin') {
    return {
      id: 'skKjd78a-#',
      username: 'admin',
      fullName: 'Admin Root',
      email: 'admin@example.com',
      roles: ['admin'],
      permissions: ['dashboard.read', 'dummies.read'],
      accessToken: 'mock-jwt-token',
      refreshToken: 'mock-jwt-refresh',
    };
  }

  throw new Error('Invalid username or password');
}

export async function logout(): Promise<void> {
  await sleep(500);

  return;
}

export async function verifySession(token: string): Promise<User> {
  await sleep(500);

  if (token === 'mock-jwt-token') {
    return {
      id: 'skKjd78a-#',
      username: 'admin',
      fullName: 'Admin Root',
      email: 'admin@example.com',
      roles: ['admin'],
      permissions: ['dashboard.read', 'dummies.read'],
      accessToken: 'mock-jwt-token',
      refreshToken: 'mock-jwt-refresh',
    };
  }

  throw new Error('Invalid token');
}
