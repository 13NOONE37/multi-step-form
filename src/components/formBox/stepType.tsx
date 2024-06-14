import { FC } from 'react';
import { FormValuesInterface } from './FormBox';
import { FormikErrors, FormikTouched } from 'formik';

export interface renderContentInterface {
  values: FormValuesInterface;
  errors: FormikErrors<FormValuesInterface>;
  touched: FormikTouched<FormValuesInterface>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void | FormikErrors<FormValuesInterface>>;
}
export interface StepType {
  path: string;
  heading: string;
  description: string;
  name: string;
  Content: FC<renderContentInterface>;
}
