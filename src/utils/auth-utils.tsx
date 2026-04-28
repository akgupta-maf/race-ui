import { UserDetails } from '../services/auth.response';

export const getUserInfo = () => {
  if (localStorage.getItem('__user_assortment__') !== 'undefined') {
    return JSON.parse(localStorage.getItem('__user_assortment__')!);
  } else {
    return null;
  }
};

export const setUserInfo = (userInfo: UserDetails) => {
  localStorage.setItem('__user_assortment__', JSON.stringify(userInfo));
};

export const deleteUserInfo = () => {
  localStorage.removeItem('__user_assortment__');
};

export const getAuthToken = () => {
  return localStorage.getItem('__user_auth_assortment__');
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('__user_auth_assortment__', token);
};

export const deleteAuthToken = () => {
  localStorage.removeItem('__user_auth_assortment__');
};

export const getUserSession = () => {
  if (sessionStorage.getItem('__user_session_assortment__')) {
    return JSON.parse(sessionStorage.getItem('__user_session_assortment__')!);
  } else {
    return null;
  }
};

export const setUserSession = (userSession: any) => {
  sessionStorage.setItem(
    '__user_session_assortment__',
    JSON.stringify(userSession),
  );
};
