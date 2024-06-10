import { FC } from 'react';
import { StepType } from './stepType';
import styles from './FormBox.module.css';
import ControlButton from '../controlButton/ControlButton';
import { FormikErrors } from 'formik';
import { FormValuesInterface } from './FormBox';

interface ControlsContainerProps {
  steps: StepType[];
  currentStepIndex: number;
  back: () => void;
  next: () => void;
  isSubmitting: boolean;
  disabled: boolean;
}

const ControlsContainer: FC<ControlsContainerProps> = ({
  steps,
  currentStepIndex,
  back,
  next,
  isSubmitting,
  disabled,
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
          onClick={() => {}}
          className={styles.submit}
          type={'submit'}
          variant={'submit'}
          disabled={isSubmitting}
        >
          Confirm
        </ControlButton>
      ) : (
        <ControlButton
          onClick={next}
          className={styles.next}
          variant={'primary'}
          disabled={disabled}
        >
          Next Step
        </ControlButton>
      )}
    </div>
  );
};
export default ControlsContainer;
