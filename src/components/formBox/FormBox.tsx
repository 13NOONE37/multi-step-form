import { useEffect, useState, FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Form, Formik, FormikErrors, FormikProps } from 'formik';
import { ZodError, z } from 'zod';

import styles from './FormBox.module.css';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';

import ProgressContainer from './ProgressContainer';
import ControlsContainer from './ControlsContainer';
import ThankYouBox from './ThankYouBox';

import PersonalInfoStep from './formSteps/personalInfo/PersonalInfoStep';
import PlanSelectionStep from './formSteps/planSelection/PlanSelectionStep';
import AddOnsStep from './formSteps/addOns/AddOnsStep';
import SummaryStep from './formSteps/summary/SummaryStep';

import { ADD_ON_NAMES, PLAN_NAMES } from './formConstans';

export interface FormValuesInterface {
  name: string;
  email: string;
  phone: string;
  isYearlyBilled: boolean;
  plan: PLAN_NAMES;
  addOns: string[] | [];
}

const FORM_VALUES_LOCAL_STORAGE_KEY = 'multiStepFormValuesKey';
const formInitalValues = {
  name: '',
  email: '',
  phone: '',
  isYearlyBilled: false, //False means monthly
  plan: PLAN_NAMES.ARCADE,
  addOns: [ADD_ON_NAMES.ONLINE_SERVICES, ADD_ON_NAMES.LARGER_STORAGE],
};

const FormBox: FC = () => {
  const { steps, currentStepIndex, goTo, back, next } = useMultistepForm([
    {
      path: '/personal-info',
      heading: 'Personal info',
      description: 'Please provide your name, email address, and phone number.',
      name: 'YOUR INFO',
      Content: PersonalInfoStep,
    },
    {
      path: '/select-plan',
      heading: 'Select your plan',
      description: 'You have the option of monthly or yearly billing.',
      name: 'SELECT PLAN',
      Content: PlanSelectionStep,
    },
    {
      path: '/add-ons',
      heading: 'Pick add-ons',
      description: 'Add-ons help enhance your gaming experience.',
      name: 'ADD-ONS',
      Content: AddOnsStep,
    },
    {
      path: '/summary',
      heading: 'Finishing up',
      description: 'Double-check everything looks OK before confirming.',
      name: 'SUMMARY',
      Content: SummaryStep,
    },
  ]);

  const PhoneNumberRegex = /^\+1\s*(\d\s*){9}$/;
  const ValidationSchema = z.object({
    name: z.string().min(1, 'This field is required'),
    email: z
      .string()
      .min(1, 'This field is required')
      .email('Invalid email address'),
    phone: z
      .string()
      .min(1, 'This field is required')
      .regex(PhoneNumberRegex, 'Invalid phone number'),
  });

  const {
    localStorageState: formValues,
    handleUpdateLocalStorageState,
    resetLocalStorageState,
  } = useLocalStorageState({
    key: FORM_VALUES_LOCAL_STORAGE_KEY,
    value: formInitalValues,
  });

  const [displayThankYou, setDisplayThankYou] = useState(false);
  const handleSubmit = (values: FormValuesInterface) => {
    console.log(values);
    resetLocalStorageState();
    setDisplayThankYou(true);
  };
  const handlePreSubmit = (
    errors: FormikErrors<FormValuesInterface>,
    setTouched: FormikProps<FormValuesInterface>['setTouched'],
  ) => {
    if (errors.name || errors.email || errors.phone) {
      setTouched({ name: true, email: true, phone: true });
      return goTo(0);
    }
  };

  const handleValidate = (values: FormValuesInterface) => {
    try {
      ValidationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  return (
    <Formik
      initialValues={formValues}
      validate={handleValidate}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        setFieldValue,
        setTouched,
      }) => {
        useEffect(() => {
          handleUpdateLocalStorageState(values);
        }, [values]);

        return (
          <>
            <Form className={styles.container}>
              <ProgressContainer
                steps={steps}
                currentStepIndex={currentStepIndex}
                goTo={goTo}
                disabled={displayThankYou}
              />
              <div className={styles.formContainer}>
                <div className={styles.formBox}>
                  {displayThankYou ? (
                    <ThankYouBox />
                  ) : (
                    <Routes>
                      {steps.map(({ heading, description, path, Content }) => (
                        <Route
                          key={path}
                          path={path}
                          element={
                            <>
                              <h1 className={styles.heading}>{heading}</h1>
                              <p className={styles.description}>
                                {description}
                              </p>
                              <Content
                                values={values}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                setFieldValue={setFieldValue}
                              />
                            </>
                          }
                        />
                      ))}
                    </Routes>
                  )}
                </div>
              </div>

              {!displayThankYou && (
                <ControlsContainer
                  steps={steps}
                  currentStepIndex={currentStepIndex}
                  back={back}
                  next={next}
                  isSubmitting={isSubmitting}
                  onClickSubmit={() => handlePreSubmit(errors, setTouched)}
                />
              )}
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default FormBox;
