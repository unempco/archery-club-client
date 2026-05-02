import type { RequestOptions } from '@/core/types/request';

import { NotOkResponseError } from '@/core/errors';
import { buildUrl, isLoginPath } from '@/core/lib/request';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/modules/auth/lib/token';

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export async function request<TData>(
  method: string,
  path: string,
  options: RequestOptions = {},
  isRetry = false,
): Promise<TData> {
  const { query, body, signal } = options;

  const url = buildUrl(path, query);

  const headers: HeadersInit = {};
  let requestBody: BodyInit | undefined;

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    requestBody = JSON.stringify(body);
  }

  if (!isLoginPath(path)) {
    const token = getAccessToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: requestBody,
    signal,
  });

  // -- 401 handling with a single refresh attempt --------------------------
  if (response.status === 401 && !isRetry && !isLoginPath(path)) {
    await ensureRefresh();
    return request<TData>(method, path, options, true);
  }

  // -- Error handling ------------------------------------------------------
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = await response.text();
    }

    throw new NotOkResponseError({
      title: errorData?.title ?? response.statusText,
      detail: errorData?.detail ?? 'No additional error information provided.',
      status: response.status,
      // Include optional fields if they exist in the error response
      type: errorData?.type,
      instance: errorData?.instance,
    });
  }

  // -- Empty response (204, 205, etc.) -------------------------------------
  if (
    response.status === 204 ||
    response.headers.get('content-length') === '0'
  ) {
    return undefined as TData;
  }

  return await response.json();
}

async function ensureRefresh(): Promise<void> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  const refreshUrl = buildUrl('/auth/refresh');
  const refreshToken = getRefreshToken();

  refreshPromise = fetch(refreshUrl, {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok)
        throw new NotOkResponseError({
          title: 'Token refresh failed',
          detail: `Refresh endpoint responded with status ${res.status}`,
          status: res.status,
        });

      return res.json();
    })
    .then((data) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
}
