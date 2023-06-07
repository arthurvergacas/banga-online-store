import Button from 'components/Button';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Login.module.css';
import Input from 'components/Input';
import UserService from 'services/userService';
import { useForm } from 'react-hook-form';

interface LoginInputValues {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const useFormProps = useForm<LoginInputValues>({ mode: 'all' });

  const onSubmit = async (data: LoginInputValues) => {
    try {
      await UserService.login(data.email, data.password);
    } catch {
      // TODO mostrar umas mensagens de que não conseguiu fazer login
      console.log('não consegui fazer login');
      return;
    }

    navigate('/profile');
  };

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
      </form>

      <small>Esqueceu sua senha? Contate um administrador.</small>

      <Link to="/sign-up">Não possui uma conta?</Link>
    </div>
  );
}
