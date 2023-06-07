import { useEffect, useState } from 'react';
import { User } from '@banga/types/user';

import styles from './Profile.module.css';
import UserService from 'services/userService';
import Spinner from 'components/Spinner';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState<User>();
  const [userLoading, setUserLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      setUserLoading(true);
      setUser(await UserService.getUserData());
      setUserLoading(false);
    };

    getUser();
  }, []);

  if (userLoading) {
    return (
      <div
        className={styles.container}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <Spinner width="5em" height="5em" />
      </div>
    );
  }

  return (
    <div id={styles.container}>
      <header>
        <div>
          <h1>{user?.name}</h1>
          <span>{user?.email}</span>
        </div>

        <span>{user?.phone}</span>
      </header>

      <div id={styles.profileContent}>
        <div>
          <section>
            <h2>Dados Pessoais</h2>
            <div className={styles.profileRow}>
              <span>CPF: {user?.cpf}</span>
              <span>RG: {user?.rg}</span>
            </div>

            <div className={styles.profileRow}>
              <span>
                Data de nascimento:{' '}
                <time dateTime={user?.birthDate.toDateString()}>{user?.birthDate.toLocaleDateString()}</time>
              </span>
            </div>
          </section>

          <section>
            <h2>Endereço de entrega</h2>
            <address>{user?.address}</address>
          </section>
        </div>

        {user?.isAdmin && (
          <div id={styles.adminButtonsContainer}>
            <Button onClick={() => navigate('/admin/users')}>Gerenciar Contas</Button>
            <Button onClick={() => navigate('/admin/products')}>Gerenciar Produtos</Button>
          </div>
        )}
      </div>
    </div>
  );
}
