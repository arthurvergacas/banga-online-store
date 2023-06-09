import { UseFormReturn } from 'react-hook-form';
import styles from './Input.module.css';

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  step?: number;
  width?: string;
  autoComplete?: string;
  maxLenght?: number;

  useFormProps: UseFormReturn<any>;
  required?: boolean;
}

export default function Input({ useFormProps, ...props }: InputProps) {
  const errorBorderColorCss = `
    .${styles.label}[for='${props.name}'] .${styles.inputContainer}:focus-within::after {
      border-bottom-color: var(--redish);
    }
  `;

  const controlHasErrors = (): boolean => !!useFormProps.formState.errors[props.name];

  return (
    <>
      {controlHasErrors() && <style>{errorBorderColorCss}</style>}

      <label htmlFor={props.name} className={styles.label} style={{ width: props.width }}>
        {props.label}
        <div className={styles.inputContainer}>
          <input
            autoComplete={props.autoComplete}
            type={props.type ?? 'text'}
            id={props.name}
            step={props.step}
            placeholder={props.placeholder}
            maxLength={props.maxLenght}
            {...useFormProps.control.register(props.name, {
              required: props.required,
            })}
          />
        </div>

        {controlHasErrors() && props.required && (
          <small className={styles.errorMessage}>Campo obrigatório</small>
        )}
      </label>
    </>
  );
}
