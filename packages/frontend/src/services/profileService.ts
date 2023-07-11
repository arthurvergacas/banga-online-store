import { User } from '@banga/types/user';
import api from './api';

const ProfileService = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get('/users');
    return data;
  },

  getById: async (userId: User['_id']): Promise<User | undefined> => {
    const { data } = await api.get(`/users/${userId}`);
    return data;
  },

  save: async (userData: User): Promise<void> => {
    return api.put(`/users/${userData._id}`, userData);
  },

  delete: async (userId: User['_id']): Promise<void> => {
    return api.delete(`/users/${userId}`);
  },
};

export default ProfileService;
