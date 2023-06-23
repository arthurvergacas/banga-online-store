import { User, UserRequest } from '@banga/types/user';

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

  getById: async (userId: User['id']): Promise<User | undefined> => {
    await sleep();

    return mockUsers.find((user) => user.id === userId);
  },

  save: async (userData: User): Promise<void> => {
    await sleep();

    const userIndex = mockUsers.findIndex((user) => user.id === userData.id);
    mockUsers[userIndex] = userData;
  },

  remove: async (userId: User['id']): Promise<void> => {
    await sleep();

    const userIndex = mockUsers.findIndex((user) => user.id === userId);
    mockUsers.splice(userIndex, 1);
  },
};

export default UserService;
