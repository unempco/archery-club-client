import type {
  Session,
  SessionsSearchParams,
  UpdateSessionFormData,
} from '@/modules/sessions/types';
import type { Lookup } from '@/modules/shared/types';

import api from '@/core/api';

export const SESSIONS_MODULE_NAME = 'sessions';

export async function getAllSessions() {
  return await api.get<Lookup[]>(`/${SESSIONS_MODULE_NAME}/lookup`);
}

export async function getSessionsList(params: SessionsSearchParams) {
  return await api.getList<Session>(SESSIONS_MODULE_NAME, {
    query: params,
  });
}

export async function getSessionById(id: number) {
  return await api.getById<Session>(SESSIONS_MODULE_NAME, id);
}

export async function updateSession(
  id: number,
  session: UpdateSessionFormData,
) {
  return await api.patchById<Session>(SESSIONS_MODULE_NAME, id, {
    body: session,
  });
}

export async function deleteSession(id: number) {
  return await api.deleteById(SESSIONS_MODULE_NAME, id);
}
