import { UseFormRegister } from 'react-hook-form';
import styles from './Input.module.css';

interface InputProps {
  name: string;
  register: UseFormRegister<any>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  width?: string;
}

export default function Input(props: InputProps) {
  return (
    <label htmlFor={props.name} id={styles.label} style={{ width: props.width }}>
      {props.label}
      <div id={styles.inputContainer}>
        <input
          type={props.type ?? 'text'}
          id={props.name}
          placeholder={props.placeholder}
          {...props.register(props.name, { required: props.required })}
        />
      </div>
    </label>
  );
}
