import { User } from './user';

export interface JwtPayload {
  userId: string;
  userData: User;
}
