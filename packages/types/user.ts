export interface User {
  isAdmin: boolean;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  birthDate: Date;
  address: string;
}

export interface UserResponse extends Omit<User, 'birthDate'> {
  birthDate: string;
}

export type UserRequest = Omit<User, 'isAdmin'>;
