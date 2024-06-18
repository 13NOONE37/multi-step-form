import { FC } from 'react';
import { StepType } from './stepType';
import styles from './FormBox.module.css';
import ControlButton from '../controlButton/ControlButton';

interface ControlsContainerProps {
  steps: StepType[];
  currentStepIndex: number;
  back: () => void;
  next: () => void;
  isSubmitting: boolean;
  onClickSubmit?: () => void;
}

const ControlsContainer: FC<ControlsContainerProps> = ({
  steps,
  currentStepIndex,
  back,
  next,
  isSubmitting,
  onClickSubmit = () => {},
}) => {
  return (
    <div className={styles.controlsContainer}>
      {currentStepIndex !== 0 && (
        <ControlButton
          onClick={back}
          className={styles.back}
          variant={'secondary'}
        >
          Go Back
        </ControlButton>
      )}
      {currentStepIndex === steps.length - 1 ? (
        <ControlButton
          onClick={onClickSubmit}
          className={styles.submit}
          type={'submit'}
          variant={'submit'}
          disabled={isSubmitting}
          key={'stepButton'}
          focusOnRender
        >
          Confirm
        </ControlButton>
      ) : (
        <ControlButton
          onClick={next}
          className={styles.next}
          variant={'primary'}
          key={'submitButton'}
        >
          Next Step
        </ControlButton>
      )}
    </div>
  );
};
export default ControlsContainer;
