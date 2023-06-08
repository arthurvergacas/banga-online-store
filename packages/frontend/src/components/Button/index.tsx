import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;

  className?: string;
}

export default function Button({ children, type, onClick, disabled, className }: React.PropsWithChildren<ButtonProps>) {
  return (
    <button type={type ?? 'button'} className={`${className} ${styles.btn}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
