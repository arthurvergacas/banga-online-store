import Button from 'components/Button';
import { Link } from 'react-router-dom';

import styles from './Login.module.css';
import Input from 'components/Input';

export default function Login() {
  return (
    <div id={styles.container}>
      <form id={styles.loginForm}>
        <h1>Login</h1>

        <Input label="Email" name="email" type="email" placeholder="Email" width="min(80%, 18em)" />

        <Input label="Senha" name="password" type="password" placeholder="Senha" width="min(80%, 18em)" />

        <Button type="submit">ENTRAR</Button>
      </form>

      <small>Esqueceu sua senha? Contate um administrador.</small>

      <Link to="/sign-up">Não possui uma conta?</Link>
    </div>
  );
}
