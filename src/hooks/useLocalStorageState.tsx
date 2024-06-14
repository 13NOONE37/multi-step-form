import { useCallback, useState } from 'react';
import { FormValuesInterface } from '../components/formBox/FormBox';

interface useLocalStorageStateInterface {
  key: string;
  value: FormValuesInterface;
}
export function useLocalStorageState({
  key,
  value,
}: useLocalStorageStateInterface) {
  const parsedLocalStorage = JSON.parse(localStorage.getItem(key) || '{}');
  const initialValue =
    Object.keys(parsedLocalStorage).length > 0 ? parsedLocalStorage : value;

  const [localStorageState, setLocalStorageState] = useState(initialValue);

  const handleUpdateLocalStorageState = useCallback(
    (x: FormValuesInterface) => {
      setLocalStorageState(x);
      localStorage.setItem(key, JSON.stringify(x));
    },
    [key],
  );

  const resetLocalStorageState = () => {
    setLocalStorageState(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return {
    localStorageState,
    handleUpdateLocalStorageState,
    resetLocalStorageState,
  };
}
