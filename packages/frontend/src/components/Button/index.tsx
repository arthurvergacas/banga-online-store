import styles from './Button.module.css';

export default function Button({ children }: React.PropsWithChildren) {
  return (
    <button type="button" id={styles.btn}>
      {children}
    </button>
  );
}
