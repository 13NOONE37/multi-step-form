import { FC, ReactNode } from 'react';
import styles from './ControlButton.module.css';
import cx from 'classnames';

interface ControlButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  type?: 'button' | 'submit';
  variant: 'secondary' | 'primary' | 'submit';
  disabled?: boolean;
}
const ControlButton: FC<ControlButtonProps> = ({
  children,
  className = '',
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <button
      className={cx(styles.button, className, styles[`button__${variant}`])}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ControlButton;
