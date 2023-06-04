import { Link } from 'react-router-dom';
import styles from './Error.module.css';

export default function Error() {
  return (
    <div className={styles.container}>
      <h1>Página não encontrada :(</h1>
      <Link to="/">Voltar para a página inicial</Link>
    </div>
  );
}
