import { useEffect, useState } from 'react';
import { StepType } from '../components/formBox/stepType';
import { useLocation, useNavigate } from 'react-router-dom';

export function useMultistepForm(steps: StepType[]) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPathIndex = steps.findIndex(
    ({ path }) => path === location.pathname,
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(
    currentPathIndex !== -1 ? currentPathIndex : 0,
  );

  useEffect(() => {
    navigate(steps[currentStepIndex].path);
  }, [currentStepIndex]);

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
    if (index < 0 || index > steps.length - 1) return;
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
