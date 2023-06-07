import { Payment as PaymentType } from '@banga/types/payment';
import Input from 'components/Input';
import styles from './Payment.module.css';
import { useForm } from 'react-hook-form';
import Button from 'components/Button';

export default function Payment() {
  const useFormProps = useForm<PaymentType>({ mode: 'onChange' });

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>Dados de pagamento</h1>

        <div className={styles.row}>
          <Input
            label="Número do cartão"
            useFormProps={useFormProps}
            required
            name="cardNumber"
            type="text"
            placeholder="ex.: João Maria da Silva"
          />

          <Input
            label="Nome do titular"
            useFormProps={useFormProps}
            required
            name="cardholder"
            type="text"
            placeholder="ex.: João Maria da Silva"
          />
        </div>

        <div className={styles.row}>
          <Input label="Validade" useFormProps={useFormProps} required name="expirationDate" type="date" />

          <Input label="CVV" useFormProps={useFormProps} required name="cvv" type="number" placeholder="XXX" />
        </div>

        <Button type="submit">Finalizar Compra</Button>
      </form>
    </div>
  );
}
