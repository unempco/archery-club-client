/* Example api functions for branches module. These functions simulate API calls using localStorage and timeouts. */

import type {
  Branch,
  BranchesSearchParams,
  CreateBranchFormData,
  UpdateBranchFormData,
} from '@/modules/branches/types';

import api from '@/core/api';

const MODULE_NAME = 'branches';

export async function getAllBranches() {
  return await api.get(`/${MODULE_NAME}/lookup`);
}

export async function getBranchesList(
  branchesSearchParams: BranchesSearchParams,
) {
  return await api.getList<Branch>(MODULE_NAME, {
    query: branchesSearchParams,
  });
}

export async function getBranchById(id: number) {
  return await api.getById<Branch>(MODULE_NAME, id);
}

export async function createBranch(branch: CreateBranchFormData) {
  return await api.post<Branch>(MODULE_NAME, {
    body: branch,
  });
}

export async function updateBranch(id: number, branch: UpdateBranchFormData) {
  return await api.patchById<Branch>(MODULE_NAME, id, {
    body: branch,
  });
}

export async function deleteBranch(id: number) {
  return await api.deleteById(MODULE_NAME, id);
}
