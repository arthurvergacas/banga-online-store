import { User, UserRequest } from '@banga/types/user';

import sleep from './sleep';
import { Login } from '@banga/types/login';
import { loggedUser } from './mockUsers';

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

  logout: async (): Promise<void> => {
    await sleep();

    userSessionCreated = false;
  },

  signUp: async (signUpData: UserRequest): Promise<void> => {
    await sleep();

    userSessionCreated = true;
  },
};

export default UserService;
