import { UseFormRegister } from 'react-hook-form';
import styles from './Input.module.css';

interface InputProps {
  name: string;
  register: UseFormRegister<any>;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  width?: string;

  required?: boolean;
  hasError?: boolean;
}

export default function Input(props: InputProps) {
  const errorBorderColorCss = `
    .${styles.label}[for='${props.name}'] .${styles.inputContainer}:focus-within::after {
      border-bottom-color: var(--redish);
    }
  `;

  return (
    <>
      {props.hasError && <style>{errorBorderColorCss}</style>}

      <label htmlFor={props.name} className={styles.label} style={{ width: props.width }}>
        {props.label}
        <div className={styles.inputContainer}>
          <input
            type={props.type ?? 'text'}
            id={props.name}
            placeholder={props.placeholder}
            {...props.register(props.name, { required: props.required })}
          />
        </div>
      </label>
    </>
  );
}
