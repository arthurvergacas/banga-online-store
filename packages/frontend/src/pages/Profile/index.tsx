import { useEffect, useState } from 'react';
import { User } from '@banga/types/user';

import styles from './Profile.module.css';
import UserService from 'services/userService';
import Spinner from 'components/Spinner';
import Button from 'components/Button';

export default function Profile() {
  const [user, setUser] = useState<User>();
  const [userLoading, setUserLoading] = useState(true);

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
        <Spinner size="5em" />
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

        <div id={styles.adminButtonsContainer}>
          <Button>Gerenciar Contas</Button>
          <Button>Gerenciar Produtos</Button>
        </div>
      </div>
    </div>
  );
}
