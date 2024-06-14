import { FC } from 'react';
import { StepType } from './stepType';
import styles from './FormBox.module.css';
import StepButton from '../stepButton/StepButton';

interface ProgressContainerProps {
  steps: StepType[];
  currentStepIndex: number;
  goTo: (index: number) => void;
  disabled?: boolean;
}

const ProgressContainer: FC<ProgressContainerProps> = ({
  steps,
  currentStepIndex,
  goTo,
  disabled,
}) => {
  return (
    <div className={styles.progressContainer}>
      {steps.map((step, index) => {
        return (
          <div className={styles.stepContainer} key={index}>
            <StepButton
              currentStepIndex={currentStepIndex}
              index={index}
              goTo={goTo}
              disabled={disabled}
            />
            <span className={styles['stepContainer--stepIndicator']}>
              STEP {index + 1}
            </span>
            <span className={styles['stepContainer--stepName']}>
              {step.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default ProgressContainer;
