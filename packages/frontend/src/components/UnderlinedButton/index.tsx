import styles from './UnderlinedButton.module.css';

interface UnderlinedButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function UnderlinedButton({
  children,
  className,
  onClick,
}: React.PropsWithChildren<UnderlinedButtonProps>) {
  return (
    <button type="button" className={`${styles.underlineButton} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
