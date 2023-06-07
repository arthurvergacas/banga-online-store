export interface User {
  id: string;
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

export interface UserRequest extends Omit<User, 'isAdmin' | 'birthDate'> {
  birthDate: string;
  password: string;
}
