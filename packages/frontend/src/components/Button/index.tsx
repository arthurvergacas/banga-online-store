import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, type, onClick }: React.PropsWithChildren<ButtonProps>) {
  return (
    <button type={type ?? 'button'} id={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
}
