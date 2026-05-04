import type {
  CreateGroupFormData,
  Group,
  GroupsSearchParams,
  UpdateGroupFormData,
} from '@/modules/groups/types';
import type { Lookup } from '@/modules/shared/types';

import api from '@/core/api';
import { CYCLES_MODULE_NAME } from '@/modules/cycles/api/query-fns';

export const GROUPS_MODULE_NAME = 'groups';

export async function getAllGroups() {
  return await api.get<Lookup[]>(`/${GROUPS_MODULE_NAME}/lookup`);
}

export async function getGroupsList(groupsSearchParams: GroupsSearchParams) {
  return await api.getList<Group>(GROUPS_MODULE_NAME, {
    query: groupsSearchParams,
  });
}

export async function getGroupById(id: number) {
  return await api.getById<Group>(GROUPS_MODULE_NAME, id);
}

export async function createGroup(group: CreateGroupFormData) {
  return await api.post<Group>(
    `/${CYCLES_MODULE_NAME}/${group.cycleId}/${GROUPS_MODULE_NAME}`,
    {
      body: group,
    },
  );
}

export async function updateGroup(id: number, group: UpdateGroupFormData) {
  return await api.patchById<Group>(GROUPS_MODULE_NAME, id, {
    body: group,
  });
}

export async function deleteGroup(id: number) {
  return await api.deleteById(GROUPS_MODULE_NAME, id);
}
