export const PASSWORD_HASH_SERVICE = 'PASSWORD_HASH_SERVICE';

export interface PasswordHashServiceInterface {
  hashPassword(password: string): Promise<string>;
  validatePassword(password: string, hash: string): Promise<boolean>;
}
