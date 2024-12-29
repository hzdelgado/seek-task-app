import Cookies from 'js-cookie';
import { setTokenInCookie, removeAuthTokenCookie } from '@/application/utils/cookieUtils';

jest.mock('js-cookie', () => ({
  set: jest.fn(),
  remove: jest.fn(),
}));

describe('cookieUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setTokenInCookie', () => {
    it('should call Cookies.set with the correct parameters', () => {
      const token = 'test_token';
      
      setTokenInCookie(token);
      
      expect(Cookies.set).toHaveBeenCalledWith('auth_token', token, {
        expires: 1,
        path: '/',
        sameSite: 'Strict',
        secure: true,
      });
    });
  });

  describe('removeAuthTokenCookie', () => {
    it('should call Cookies.remove with the correct parameters', () => {
      removeAuthTokenCookie();
      
      expect(Cookies.remove).toHaveBeenCalledWith('auth_token', {
        path: '/',
      });
    });
  });
});
