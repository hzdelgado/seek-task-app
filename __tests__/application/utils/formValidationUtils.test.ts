import { isValidPassword, isValidEmail } from '@/application/utils/formValidationUtils';

describe('validationUtils', () => {
  describe('isValidPassword', () => {
    it('should return true for a valid password', () => {
      const validPassword = 'Password1@';
      expect(isValidPassword(validPassword)).toBe(true);
    });

    it('should return false for a password without a lowercase letter', () => {
      const invalidPassword = 'PASSWORD1@';
      expect(isValidPassword(invalidPassword)).toBe(false);
    });

    it('should return false for a password without an uppercase letter', () => {
      const invalidPassword = 'password1@';
      expect(isValidPassword(invalidPassword)).toBe(false);
    });

    it('should return false for a password without a digit', () => {
      const invalidPassword = 'Password@';
      expect(isValidPassword(invalidPassword)).toBe(false);
    });

    it('should return false for a password without a special character', () => {
      const invalidPassword = 'Password123';
      expect(isValidPassword(invalidPassword)).toBe(false);
    });

    it('should return false for a password shorter than 6 characters', () => {
      const invalidPassword = 'Pass@';
      expect(isValidPassword(invalidPassword)).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('should return true for a valid email', () => {
      const validEmail = 'test@example.com';
      expect(isValidEmail(validEmail)).toBe(true);
    });

    it('should return false for an email without @ symbol', () => {
      const invalidEmail = 'testexample.com';
      expect(isValidEmail(invalidEmail)).toBe(false);
    });

    it('should return false for an email without domain', () => {
      const invalidEmail = 'test@.com';
      expect(isValidEmail(invalidEmail)).toBe(false);
    });

    it('should return false for an email without top-level domain', () => {
      const invalidEmail = 'test@example';
      expect(isValidEmail(invalidEmail)).toBe(false);
    });

    it('should return false for an email with spaces', () => {
      const invalidEmail = 'test @example.com';
      expect(isValidEmail(invalidEmail)).toBe(false);
    });
  });
});
