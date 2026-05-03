import type { LoginData, User } from '@/modules/auth/types';

import api from '@/core/api';
import {
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/modules/auth/lib/token';

export async function login(data: LoginData): Promise<User> {
  const user = await api.post<User>('/auth/login', { body: data });

  setAccessToken(user.accessToken);
  setRefreshToken(user.refreshToken);

  return user;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');

  removeAccessToken();
  removeRefreshToken();
}

export async function verifySession(): Promise<User> {
  return await api.get<User>('/users/me');
}
