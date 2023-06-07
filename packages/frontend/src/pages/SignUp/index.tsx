import { useForm } from 'react-hook-form';
import styles from './SignUp.module.css';
import { UserRequest } from '@banga/types/user';
import Input from 'components/Input';
import Button from 'components/Button';
import UserService from 'services/userService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const useFormProps = useForm<UserRequest>({ mode: 'all' });

  const onSubmit = async (data: UserRequest) => {
    try {
      await UserService.signUp(data);
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }

      return;
    }

    navigate('/profile');
  };

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={useFormProps.handleSubmit(onSubmit)}>
        <h1>Login</h1>

        <Input
          label="Email"
          useFormProps={useFormProps}
          required
          name="email"
          type="email"
          placeholder="Email"
          width="min(80%, 18em)"
        />

        <Input
          label="Senha"
          useFormProps={useFormProps}
          required
          name="password"
          type="password"
          placeholder="Senha"
          width="min(80%, 18em)"
        />

        <Button type="submit">ENTRAR</Button>

        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      </form>
    </div>
  );
}
