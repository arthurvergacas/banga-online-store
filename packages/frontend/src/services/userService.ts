import { User, UserRequest, UserResponse } from '@banga/types/user';

import sleep from './sleep';
import { Login } from '@banga/types/login';
import { loggedUser, mockUsers } from './mockUsers';

let userSessionCreated = false;

const UserService = {
  getUserData: async (): Promise<User> => {
    await sleep();
    return loggedUser;
  },

  isUserLoggedIn: (): boolean => {
    return userSessionCreated;
  },

  login: async (loginData: Login): Promise<void> => {
    await sleep();

    if (loggedUser.email !== loginData.email || loginData.password !== '123')
      throw Error('Não foi possível realizar o login. Verifique seus dados e tente novamente.');

    userSessionCreated = true;
  },

  signUp: async (signUpData: UserRequest): Promise<void> => {
    await sleep();

    userSessionCreated = true;
  },

  getAll: async (): Promise<User[]> => {
    await sleep();

    return mockUsers;
  },

  getById: async (userId: string): Promise<User | undefined> => {
    await sleep();

    return mockUsers.find((user) => user.id === userId);
  },

  save: async (userData: UserResponse): Promise<void> => {
    await sleep();
  },
};

export default UserService;
