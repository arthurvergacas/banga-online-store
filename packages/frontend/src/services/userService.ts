import { User, UserRequest } from '@banga/types/user';

import { JwtPayload } from '@banga/types/auth';
import { Login, AuthResponse } from '@banga/types/login';
import api from './api';
import { parseJwt } from 'utils/parseJwt';
import StorageService, { StorageKeys } from './storageService';

const UserService = {
  getUserData: async (): Promise<User> => {
    const payload = parseJwt<JwtPayload>(StorageService.get(StorageKeys.JWT_TOKEN));
    return payload.userData;
  },

  isUserLoggedIn: (): boolean => {
    return !!StorageService.get(StorageKeys.JWT_TOKEN);
  },

  login: async (loginData: Login): Promise<void> => {
    try {
      const {
        data: { token },
      } = await api.post<AuthResponse>('/login', loginData);

      StorageService.set(StorageKeys.JWT_TOKEN, token);
    } catch {
      throw Error('Não foi possível realizar o login. Verifique seus dados e tente novamente.');
    }
  },

  signUp: async (signUpData: UserRequest): Promise<void> => {
    try {
      const {
        data: { token },
      } = await api.post<AuthResponse>('/signin', { ...signUpData, isAdmin: false });

      StorageService.set(StorageKeys.JWT_TOKEN, token);
    } catch {
      throw Error('Não foi possível realizar o cadastro. Verifique seus dados e tente novamente.');
    }
  },

  logout: async (): Promise<void> => {
    StorageService.set(StorageKeys.JWT_TOKEN, null);
  },
};

export default UserService;
