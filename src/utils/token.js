const LOCAL_STORAGE_TOKEN = "pop_auth_token"; // The authentication token
const LOCAL_STORAGE_TOKEN_EXPIRE = "pop_auth_token_expire"; // Time after which token expires
const LOCAL_STORAGE_USER_OBJECT = "pop_user_object"; // Logged user's object

export function setAuthToken(token, expire, user) {
  user = JSON.stringify(user);
  localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
  localStorage.setItem(LOCAL_STORAGE_TOKEN_EXPIRE, expire);
  localStorage.setItem(LOCAL_STORAGE_USER_OBJECT, user);
}

export function clearAuthToken() {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_EXPIRE);
  localStorage.removeItem(LOCAL_STORAGE_USER_OBJECT);
}

export function getAuthToken() {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN);
}

export function getLoggedUser() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_OBJECT));
}

export function getTokenExpire() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN_EXPIRE));
}

export function isAuthTokenValid() {
  if (!getAuthToken()) return false;
  const expireTime = localStorage.getItem(LOCAL_STORAGE_TOKEN_EXPIRE);
  if (expireTime) {
    const timeNow = new Date().getTime();
    if (parseInt(expireTime) > parseInt(timeNow)) return true;
  }
  return false;
}
