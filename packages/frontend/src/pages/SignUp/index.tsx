import { useForm } from 'react-hook-form';
import styles from './SignUp.module.css';
import { UserRequest } from '@banga/types/user';
import Input from 'components/Input';
import Button from 'components/Button';
import UserService from 'services/userService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUpProps {
  onSuccessfulSignUp: () => void;
}

export default function SignUp({ onSuccessfulSignUp }: SignUpProps) {
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

    onSuccessfulSignUp();

    navigate('/profile');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={useFormProps.handleSubmit(onSubmit)}>
        <h1>Cadastre-se</h1>

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

          <Input
            label="Senha"
            useFormProps={useFormProps}
            required
            name="password"
            type="password"
            placeholder="******"
            autoComplete="new-password"
          />
        </div>

        <div className={styles.row}>
          <Input label="CPF" useFormProps={useFormProps} required name="cpf" type="text" placeholder="XXX.XXX.XXX-XX" />

          <Input label="RG" useFormProps={useFormProps} required name="rg" type="text" placeholder="XX.XXX.XXX-X" />
        </div>

        <div className={styles.row}>
          <Input
            label="Email"
            useFormProps={useFormProps}
            required
            name="email"
            type="email"
            placeholder="example@email.com"
          />

          <Input
            label="Nascimento"
            useFormProps={useFormProps}
            required
            name="birthDate"
            type="date"
            placeholder="XX/XX/XXXX"
          />
        </div>

        <div className={styles.row}>
          <Input
            label="Endereço"
            useFormProps={useFormProps}
            required
            name="address"
            type="text"
            placeholder="Rua; número; cidade; estado"
          />

          <Input
            label="Celular"
            useFormProps={useFormProps}
            required
            name="phone"
            type="tel"
            placeholder="(XX) XXXXX-XXXX"
          />
        </div>

        <Button type="submit">CADASTRAR</Button>

        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      </form>
    </div>
  );
}
