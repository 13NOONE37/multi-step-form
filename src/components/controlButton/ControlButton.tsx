import { FC, ReactNode, useEffect, useRef } from 'react';
import styles from './ControlButton.module.css';
import cx from 'classnames';

interface ControlButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  type?: 'button' | 'submit';
  variant: 'secondary' | 'primary' | 'submit';
  disabled?: boolean;
  focusOnRender?: boolean;
}
const ControlButton: FC<ControlButtonProps> = ({
  children,
  className = '',
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  focusOnRender = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef?.current && focusOnRender) {
      buttonRef.current.focus();
    }
  }, [buttonRef]);
  return (
    <button
      className={cx(styles.button, className, styles[`button__${variant}`])}
      type={type}
      onClick={onClick}
      disabled={disabled}
      ref={buttonRef}
    >
      {children}
    </button>
  );
};

export default ControlButton;
