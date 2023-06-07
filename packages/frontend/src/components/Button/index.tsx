import styles from './Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({ children, type }: React.PropsWithChildren<ButtonProps>) {
  return (
    <button type={type ?? 'button'} id={styles.btn}>
      {children}
    </button>
  );
}
