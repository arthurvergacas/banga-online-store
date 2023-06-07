import styles from './UserCard.module.css';

export default function UserCard() {
  return (
    <div className={styles.userCard}>
      <header>
        <h3>Arthur Januher</h3>
        <h4>arth.janu@usp.br</h4>
      </header>

      <span>ADM</span>
    </div>
  );
}
