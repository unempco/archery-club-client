import type {
  CreateCycleFormData,
  Cycle,
  CyclesSearchParams,
  UpdateCycleFormData,
} from '@/modules/cycles/types';
import type { Lookup } from '@/modules/shared/types';

import api from '@/core/api';
import { BRANCHES_MODULE_NAME } from '@/modules/branches/api/query-fns';

export const CYCLES_MODULE_NAME = 'cycles';

export async function getAllCycles() {
  return await api.get<Lookup[]>(`/${CYCLES_MODULE_NAME}/lookup`);
}

export async function getCyclesList(cyclesSearchParams: CyclesSearchParams) {
  return await api.getList<Cycle>(CYCLES_MODULE_NAME, {
    query: cyclesSearchParams,
  });
}

export async function getCycleById(id: number) {
  return await api.getById<Cycle>(CYCLES_MODULE_NAME, id);
}

export async function createCycle(cycle: CreateCycleFormData) {
  return await api.post<Cycle>(
    `/${BRANCHES_MODULE_NAME}/${cycle.branchId}/${CYCLES_MODULE_NAME}`,
    {
      body: cycle,
    },
  );
}

export async function updateCycle(id: number, cycle: UpdateCycleFormData) {
  return await api.patchById<Cycle>(CYCLES_MODULE_NAME, id, {
    body: cycle,
  });
}

export async function deleteCycle(id: number) {
  return await api.deleteById(CYCLES_MODULE_NAME, id);
}
