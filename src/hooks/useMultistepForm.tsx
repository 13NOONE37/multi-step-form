import { useState } from 'react';
import { StepType } from '../components/formBox/stepType';

export function useMultistepForm(steps: StepType[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    steps,
    currentStepIndex,
    step: steps[currentStepIndex],
    goTo,
    next,
    back,
  };
}
