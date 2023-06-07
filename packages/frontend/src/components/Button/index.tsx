import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function Button({ children, type, onClick, disabled }: React.PropsWithChildren<ButtonProps>) {
  return (
    <button type={type ?? 'button'} id={styles.btn} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
