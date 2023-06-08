import Button from 'components/Button';
import styles from './Checkout.module.css';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Volte sempre!</h1>

      <div>
        <p>Obrigado por fazer negócio conosco :)</p>

        <p>Os dados de sua compra e o rastreio de seu instrumento serão enviados por email.</p>
      </div>

      <Button onClick={() => navigate('/')}>Tela Principal</Button>
    </div>
  );
}
