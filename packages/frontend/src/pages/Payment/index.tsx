import { PaymentInfo as PaymentType } from '@banga/types/payment';
import Input from 'components/Input';
import styles from './Payment.module.css';
import { useForm } from 'react-hook-form';
import Button from 'components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentService from 'services/paymentService';
import Spinner from 'components/Spinner';
import CartService from 'services/cartService';

export default function Payment() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

  const useFormProps = useForm<PaymentType>({ mode: 'onChange' });

  const navigate = useNavigate();

  const onSubmit = async (data: PaymentType) => {
    try {
      setIsLoadingPayment(true);

      await PaymentService.pay(data, CartService.getAll());

      CartService.clearCart();
      navigate('/checkout');
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    } finally {
      setIsLoadingPayment(false);
    }
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
            placeholder="Número do cartão"
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
          <Input
            label="Validade"
            useFormProps={useFormProps}
            required
            name="expirationDate"
            type="text"
            placeholder="mm/aa"
            maxLenght={5}
          />

          <Input
            label="CVV"
            useFormProps={useFormProps}
            required
            name="cvv"
            type="text"
            placeholder="XXX"
            maxLenght={3}
          />
        </div>

        <Button type="submit">
          {isLoadingPayment ? <Spinner width="none" height="100%" /> : <>Finalizar Compra</>}
        </Button>

        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      </form>
    </div>
  );
}
