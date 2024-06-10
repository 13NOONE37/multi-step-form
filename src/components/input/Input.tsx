import React, { FC, useId } from 'react';
import cx from 'classnames';
import styles from './Input.module.css';

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'number' | 'tel';
  error?: string;
  touched?: boolean;
}
const Input: FC<InputProps> = ({
  label = '',
  name,
  value,
  onChange,
  onBlur = () => {},
  placeholder = '',
  disabled = false,
  type = 'text',
  error = '',
  touched = false,
}) => {
  const id = useId();

  return (
    <div className={styles.container}>
      <span className={styles.error}>{touched ? error[0] : ''}</span>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        className={cx(styles.input, {
          [styles['input__error']]: touched && error,
        })}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
