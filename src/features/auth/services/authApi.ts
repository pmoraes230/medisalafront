import type { LoginCredentials } from '../types/LoginCredentials';

export const authApi = {
  login: async (creds: LoginCredentials): Promise<void> => {
    // Simulate an API call
    await new Promise(r => setTimeout(r, 800));
    if (creds.password !== '123') {
        throw new Error('Senha incorreta');
    }
  }
};