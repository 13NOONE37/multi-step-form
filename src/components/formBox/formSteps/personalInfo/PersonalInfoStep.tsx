import { FC } from 'react';
import { renderContentInterface } from '../../stepType';
import Input from '../../../input/Input';
import styles from './PersonalInfoStep.module.css';

const PersonalInfoStep: FC<renderContentInterface> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => {
  return (
    <div className={styles.form}>
      <Input
        label={'Name'}
        placeholder={'e.g. Stephen King'}
        type={'text'}
        name={'name'}
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
        focusOnRender={true}
      />
      <Input
        label={'Email Address'}
        placeholder={'e.g. stephenking@lorem.com'}
        type={'email'}
        name={'email'}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
      />
      <Input
        label={'Phone Number'}
        placeholder={'e.g. +1 234 567 890'}
        type={'text'}
        name={'phone'}
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.phone}
        touched={touched.phone}
      />
    </div>
  );
};

export default PersonalInfoStep;
