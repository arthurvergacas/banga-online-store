import styles from './Input.module.css';

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  width?: string;
}

export default function Input(props: InputProps) {
  return (
    <label htmlFor={props.name} id={styles.label} style={{ width: props.width }}>
      {props.label}
      <div id={styles.inputContainer}>
        <input type={props.type ?? 'text'} id={props.name} placeholder={props.placeholder} />
      </div>
    </label>
  );
}
