import { FC } from 'react';
import styles from './StepButton.module.css';
import cx from 'classnames';
interface StepButtonProps {
  currentStepIndex: number;
  index: number;
  goTo: (index: number) => void;
  disabled?: boolean;
}
const StepButton: FC<StepButtonProps> = ({
  currentStepIndex,
  index,
  goTo,
  disabled,
}) => {
  return (
    <button
      type="button"
      onClick={() => goTo(index)}
      className={cx(styles.button, {
        [styles['button__active']]: currentStepIndex === index,
      })}
      aria-label={`Go to step ${index + 1}`}
      disabled={disabled}
    >
      <span>{index + 1}</span>
    </button>
  );
};

export default StepButton;
