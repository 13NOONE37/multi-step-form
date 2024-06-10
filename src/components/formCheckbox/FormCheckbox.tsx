import React, { FC, useId } from 'react';
import cx from 'classnames';
import styles from './FormCheckbox.module.css';
import CheckIcon from '../../assets/images/icon-checkmark.svg?react';

interface FormCheckboxProps {
  name: string;
  heading?: string;
  description?: string;
  price?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
}
const FormCheckbox: FC<FormCheckboxProps> = ({
  name,
  heading = '',
  description = '',
  price = '',
  checked,
  value,
  onChange,
  onBlur = () => {},
}) => {
  const id = useId();
  return (
    <div
      className={cx(styles.container, {
        [styles['container__active']]: checked,
      })}
    >
      <label htmlFor={id} className={styles.label}>
        <span className={styles.heading}>{heading}</span>
        <span className={styles.description}>{description}</span>
        <span className={styles.price}>{price}</span>
        <input
          type={'checkbox'}
          className={styles.input}
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
        />
        <div className={styles.check}>
          <CheckIcon />
        </div>
      </label>
    </div>
  );
};

export default FormCheckbox;
