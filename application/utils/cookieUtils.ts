import Cookies from 'js-cookie';

export const setTokenInCookie = (token: string) => {
  Cookies.set('auth_token', token, {
    expires: 1, 
    path: '/',   
    sameSite: 'Strict',
    secure: true,
  });
};

export const removeAuthTokenCookie = () => {
  Cookies.remove('auth_token', {
    path: '/', 
  });
};