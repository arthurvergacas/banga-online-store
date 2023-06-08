import Button from 'components/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from 'components/Input';
import UserService from 'services/userService';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Login as LoginType } from '@banga/types/login';

import styles from './Login.module.css';
import { GuardedRouteState } from 'routes/GuardedRoute/guardedRouteState';

interface LoginProps {
  onSuccessfulLogin: () => void;
}

export default function Login({ onSuccessfulLogin }: LoginProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const useFormProps = useForm<LoginType>({ mode: 'all' });

  const onSubmit = async (data: LoginType) => {
    try {
      await UserService.login(data);
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }

      return;
    }

    onSuccessfulLogin();

    navigate((location.state as GuardedRouteState).referer ?? '/profile');
  };

  useEffect(() => {
    if (UserService.isUserLoggedIn()) navigate('/profile');
  }, [navigate]);

  return (
    <div id={styles.container}>
      <form id={styles.loginForm} onSubmit={useFormProps.handleSubmit(onSubmit)}>
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

      <small>Esqueceu sua senha? Contate um administrador.</small>

      <Link to="/sign-up">Não possui uma conta?</Link>
    </div>
  );
}
