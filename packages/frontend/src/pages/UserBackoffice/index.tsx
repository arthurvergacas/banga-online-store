import { useEffect, useState } from 'react';
import styles from './UserBackoffice.module.css';
import UserCard from './components/UserCard';
import { User } from '@banga/types/user';
import UserService from 'services/userService';
import Spinner from 'components/Spinner';

export default function UserBackoffice() {
  const [users, setUsers] = useState<User[]>();
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      setUsersLoading(true);
      setUsers(await UserService.getAll());
      setUsersLoading(false);
    };

    getUsers();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Usuários</h1>

      <div className="grid" style={{ gridTemplateColumns: usersLoading ? '1fr' : undefined }}>
        {usersLoading ? (
          <Spinner width="30%" height="30%" />
        ) : (
          users?.map((user) => <UserCard user={user} key={user.id} />)
        )}
      </div>
    </div>
  );
}
