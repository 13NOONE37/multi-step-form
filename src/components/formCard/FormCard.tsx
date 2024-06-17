import React, { FC, ReactNode, useId } from 'react';
import styles from './FormCard.module.css';

interface FormCardProps {
  icon?: ReactNode;
  name: string;
  value: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  cardName?: string;
  cardPrice?: string;
  cardDescription?: string;
}
const FormCard: FC<FormCardProps> = ({
  icon = '',
  name,
  value,
  checked,
  onChange,
  cardName = '',
  cardPrice = '',
  cardDescription = '',
}) => {
  const id = useId();
  return (
    <div className={styles.container}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.input}
        id={id}
        data-testid={value}
      />
      <label htmlFor={id} className={styles.label}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {cardName && <span className={styles.name}>{cardName}</span>}
        {cardPrice && <span className={styles.price}>{cardPrice}</span>}
        {cardDescription && (
          <span className={styles.description}>{cardDescription}</span>
        )}
      </label>
    </div>
  );
};

export default FormCard;
