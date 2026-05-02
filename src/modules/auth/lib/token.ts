import Cookies from 'js-cookie';

const ACCESS_TOKEN_COOKIE_KEY = 'vite.access-token';
const REFRESH_TOKEN_COOKIE_KEY = 'vite.refresh-token';

export function getAccessToken() {
  return Cookies.get(ACCESS_TOKEN_COOKIE_KEY);
}

export function setAccessToken(token: string) {
  return Cookies.set(ACCESS_TOKEN_COOKIE_KEY, token, { expires: 7 * 2 });
}

export function removeAccessToken() {
  return Cookies.remove(ACCESS_TOKEN_COOKIE_KEY);
}

export function getRefreshToken() {
  return Cookies.get(REFRESH_TOKEN_COOKIE_KEY);
}

export function setRefreshToken(token: string) {
  return Cookies.set(REFRESH_TOKEN_COOKIE_KEY, token, { expires: 7 * 2 });
}

export function removeRefreshToken() {
  return Cookies.remove(REFRESH_TOKEN_COOKIE_KEY);
}
