import { User } from '@banga/types/user';

import sleep from './sleep';

const mockUser: User = {
  isAdmin: true,
  name: 'Mock User Name',
  email: 'mock@email.com',
  phone: '+55 (16) 98765-4321',
  cpf: '123.456.789-0',
  rg: '12.345.678-9',
  birthDate: new Date('2003-03-25T00:00'),
  address: 'Rua XIX de Abril, 2023',
};

let userSessionCreated = false;

const UserService = {
  getUserData: async (): Promise<User> => {
    await sleep();
    return mockUser;
  },

  isUserLoggedIn: (): boolean => {
    return userSessionCreated;
  },

  login: async (): Promise<void> => {
    await sleep();
    userSessionCreated = true;
  },
};

export default UserService;
