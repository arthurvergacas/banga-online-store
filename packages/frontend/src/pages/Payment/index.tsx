import { Payment as PaymentType } from '@banga/types/payment';
import Input from 'components/Input';
import styles from './Payment.module.css';
import { useForm } from 'react-hook-form';
import Button from 'components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paymentService from 'services/paymentService';

export default function Payment() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const useFormProps = useForm<PaymentType>({ mode: 'onChange' });

  const navigate = useNavigate();

  const onSubmit = async (data: PaymentType) => {
    try {
      await paymentService.pay(data);
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }

      return;
    }

    navigate('/checkout');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={useFormProps.handleSubmit(onSubmit)}>
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

        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      </form>
    </div>
  );
}
