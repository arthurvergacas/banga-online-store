import { User } from '@banga/types/user';

export const mockUsers: User[] = [
  {
    id: Math.floor(Math.random() * 1000).toString(),
    isAdmin: true,
    name: 'Mock User Name',
    email: 'mock@email.com',
    phone: '+55 (16) 98765-4321',
    cpf: '123.456.789-0',
    rg: '12.345.678-9',
    birthDate: '2003-03-25',
    address: 'Rua XIX de Abril, 2023',
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    isAdmin: false,
    name: 'Mock User Name',
    email: 'mock@email.com',
    phone: '+55 (16) 98765-4321',
    cpf: '123.456.789-0',
    rg: '12.345.678-9',
    birthDate: '2003-03-25',
    address: 'Rua XIX de Abril, 2023',
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    isAdmin: false,
    name: 'Mock User Name',
    email: 'mock@email.com',
    phone: '+55 (16) 98765-4321',
    cpf: '123.456.789-0',
    rg: '12.345.678-9',
    birthDate: '2003-03-25',
    address: 'Rua XIX de Abril, 2023',
  },
];

export const loggedUser: User = mockUsers[0];
