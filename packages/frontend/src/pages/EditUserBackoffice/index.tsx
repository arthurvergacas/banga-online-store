import Input from 'components/Input';
import styles from './EditUserBackoffice.module.css';
import { useForm } from 'react-hook-form';
import { User } from '@banga/types/user';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from 'services/userService';
import Spinner from 'components/Spinner';

export default function EditUserBackoffice() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  const useFormProps = useForm<User>({ mode: 'all' });

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const populateFormWithUserData = (userData: User) => {
      for (const key of Object.keys(userData) as (keyof User)[]) {
        useFormProps.setValue(key, userData[key]);
      }
    };

    const getUser = async () => {
      if (userId) {
        setUserLoading(true);
        const fetchedUser = await UserService.getById(userId);

        if (fetchedUser == null) {
          navigate('/admin/users');
          return;
        }

        populateFormWithUserData(fetchedUser);
        setUserLoading(false);
      }
    };

    getUser();
  }, [userId, navigate, useFormProps]);

  const onSubmit = async (data: User) => {
    try {
      await UserService.save(data);
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  };

  if (userLoading) {
    return (
      <div className={styles.container} style={{ height: '17em' }}>
        <Spinner width="5em" height="5em" />
      </div>
    );
  }

  // TODO isAdmin checkbox
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={useFormProps.handleSubmit(onSubmit)}>
        <h1>Editar Usuário</h1>

        <div className={styles.row}>
          <Input
            label="Nome"
            useFormProps={useFormProps}
            required
            name="name"
            type="text"
            placeholder="ex.: João Maria da Silva"
            autoComplete="new-password"
          />

          <Input label="CPF" useFormProps={useFormProps} required name="cpf" type="text" placeholder="XXX.XXX.XXX-XX" />
        </div>

        <div className={styles.row}>
          <Input label="RG" useFormProps={useFormProps} required name="rg" type="text" placeholder="XX.XXX.XXX-X" />

          <Input
            label="Email"
            useFormProps={useFormProps}
            required
            name="email"
            type="email"
            placeholder="example@email.com"
          />
        </div>

        <div className={styles.row}>
          <Input
            label="Nascimento"
            useFormProps={useFormProps}
            required
            name="birthDate"
            type="date"
            placeholder="XX/XX/XXXX"
          />

          <Input
            label="Endereço"
            useFormProps={useFormProps}
            required
            name="address"
            type="text"
            placeholder="Rua; número; cidade; estado"
          />
        </div>

        <div className={styles.row} style={{ justifyContent: 'center' }}>
          <Input
            label="Celular"
            useFormProps={useFormProps}
            required
            name="phone"
            type="tel"
            placeholder="(XX) XXXXX-XXXX"
          />
        </div>

        <Button type="submit">Salvar</Button>

        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      </form>
    </div>
  );
}