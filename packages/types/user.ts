export interface User {
  id: string;
  isAdmin: boolean;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  birthDate: string;
  address: string;
}

export interface UserRequest extends Omit<User, 'isAdmin'> {
  password: string;
}
