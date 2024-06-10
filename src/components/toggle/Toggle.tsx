import React, { FC } from 'react';
import styles from './Toggle.module.css';

interface ToggleProps {
  name: string;
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Toggle: FC<ToggleProps> = ({ name, value, onChange }) => {
  return (
    <input
      className={styles.input}
      type="checkbox"
      name={name}
      checked={value}
      onChange={onChange}
    />
  );
};

export default Toggle;
