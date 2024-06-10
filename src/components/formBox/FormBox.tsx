import React, { FC } from 'react';
import cx from 'classnames';
import styles from './FormBox.module.css';
import { useMultistepForm } from '../../hooks/useMultistepForm';

import { Form, Formik, FormikHelpers, FormikState } from 'formik';

import ProgressContainer from './ProgressContainer';
import ControlsContainer from './ControlsContainer';
import Input from '../input/Input';
import { ZodError, z } from 'zod';
import Toggle from '../toggle/Toggle';
import FormCard from '../formCard/FormCard';

import ArcadeIcon from '../../assets/images/icon-arcade.svg?react';
import AdvancedIcon from '../../assets/images/icon-advanced.svg?react';
import ProIcon from '../../assets/images/icon-pro.svg?react';
import FormCheckbox from '../formCheckbox/FormCheckbox';

const YEARLY_FACTOR = 10; //it defines discount if user pays for whole year(for how many months he really pays)

//Plans; Prices per month
enum PLAN_NAMES {
  ARCADE = 'Arcade',
  ADVANCED = 'Advanced',
  PRO = 'Pro',
}
const PLANS = {
  [PLAN_NAMES.ARCADE]: {
    name: PLAN_NAMES.ARCADE,
    price: 9,
    Icon: <ArcadeIcon />,
  },
  [PLAN_NAMES.ADVANCED]: {
    name: PLAN_NAMES.ADVANCED,
    price: 12,
    Icon: <AdvancedIcon />,
  },
  [PLAN_NAMES.PRO]: {
    name: PLAN_NAMES.PRO,
    price: 15,
    Icon: <ProIcon />,
  },
};

//Add-ons; prices per month
const ADD_ONS = {
  'Online service': {
    name: 'Online service',
    description: 'Access to multiplayer games',
    price: 1,
  },
  'Larger storage': {
    name: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    price: 2,
  },
  'Customizable profile': {
    name: 'Customizable profile',
    description: 'Custom theme on your profile',
    price: 2,
  },
};

export interface FormValuesInterface {
  name: string;
  email: string;
  phone: string;
  isYearlyBilled: boolean;
  plan: PLAN_NAMES;
  addOns: string[] | [];
}

const PhoneNumberRegex = /^\+1\s*(\d\s*){9}$/;

const FormBox = () => {
  const { steps, currentStepIndex, step, goTo, back, next } = useMultistepForm([
    {
      heading: 'Personal info',
      description: 'Please provide your name, email address, and phone number.',
      name: 'YOUR INFO',
      renderContent: ({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
      }) => (
        <div className={cx(styles.form, styles.formOne)}>
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
      ),
    },
    {
      heading: 'Select your plan',
      description: 'You have the option of monthly or yearly billing.',
      name: 'SELECT PLAN',
      renderContent: ({ values, handleChange }) => (
        <div className={cx(styles.form, styles.formTwo)}>
          <div className={styles['formTwo--cards']}>
            {Object.keys(PLANS).map((plan_name) => {
              const { name, price, Icon } =
                PLANS[plan_name as keyof typeof PLANS];

              return (
                <FormCard
                  name={'plan'}
                  checked={values.plan === name}
                  value={name}
                  onChange={handleChange}
                  icon={Icon}
                  cardName={name}
                  cardPrice={
                    values.isYearlyBilled
                      ? `$${price * YEARLY_FACTOR}/yr`
                      : `$${price}/mo`
                  }
                  cardDescription={values.isYearlyBilled ? '2 months free' : ''}
                />
              );
            })}
          </div>

          <div className={styles['formTwo--billingBar']}>
            <span
              className={cx(styles['billingBar--name'], {
                [styles['billingBar--name__active']]: !values.isYearlyBilled,
              })}
            >
              Monthly
            </span>
            <Toggle
              name="isYearlyBilled"
              value={values.isYearlyBilled}
              onChange={handleChange}
            />
            <span
              className={cx(styles['billingBar--name'], {
                [styles['billingBar--name__active']]: values.isYearlyBilled,
              })}
            >
              Yearly
            </span>
          </div>
        </div>
      ),
    },
    {
      heading: 'Pick add-ons',
      description: 'Add-ons help enhance your gaming experience.',
      name: 'ADD-ONS',
      renderContent: ({ values, handleChange }) => (
        <div className={cx(styles.form, styles.formThree)}>
          {Object.keys(ADD_ONS).map((addOnName) => {
            const { name, description, price } =
              ADD_ONS[addOnName as keyof typeof ADD_ONS];

            return (
              <FormCheckbox
                heading={name}
                description={description}
                price={
                  values.isYearlyBilled
                    ? `+$${price * YEARLY_FACTOR}/yr`
                    : `+$${price}/mo`
                }
                checked={values.addOns.includes(addOnName as never)}
                value={addOnName}
                onChange={handleChange}
                name="addOns"
              />
            );
          })}
        </div>
      ),
    },
    {
      heading: 'Finishing up',
      description: 'Double-check everything looks OK before confirming.',
      name: 'SUMMARY',
      renderContent: ({ values, setFieldValue }) => {
        const currentPlan = PLANS[values.plan as keyof typeof PLANS];
        const currentAddOns = values.addOns.map((name) => {
          return ADD_ONS[name as keyof typeof ADD_ONS];
        });
        const pricePerMonth =
          currentPlan.price +
          currentAddOns.reduce((acc, current) => acc + current.price, 0);

        return (
          <div className={cx(styles.form, styles.formFour)}>
            <div className={styles['formFour--summaryBox']}>
              <div className={styles['summaryBox--plan']}>
                <span className={styles['summaryBox--plan--name']}>
                  {currentPlan.name}(
                  {values.isYearlyBilled ? 'Yearly' : 'Monthly'})
                </span>
                <button
                  onClick={() =>
                    setFieldValue('isYearlyBilled', !values.isYearlyBilled)
                  }
                  className={styles['summaryBox--plan--button']}
                >
                  Change
                </button>
                <span className={styles['summaryBox--plan--price']}>
                  {values.isYearlyBilled
                    ? `$${currentPlan.price * YEARLY_FACTOR}/yr`
                    : `$${currentPlan.price}/mo`}
                </span>
              </div>
              <ul className={styles['summaryBox--addOns']}>
                {currentAddOns.map(({ name, price }) => (
                  <li>
                    <span className={styles['summaryBox--addOns--name']}>
                      {name}
                    </span>
                    <span className={styles['summaryBox--addOns--price']}>
                      {values.isYearlyBilled
                        ? `+$${price * YEARLY_FACTOR}/yr`
                        : `+$${price}/mo`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles['formFour--totalBox']}>
              <span className={styles['totalBox--description']}>
                {values.isYearlyBilled
                  ? 'Total (per year)'
                  : 'Total (per month)'}
              </span>
              <span className={styles['totalBox--price']}>
                +$
                {values.isYearlyBilled
                  ? `${pricePerMonth * YEARLY_FACTOR}/yr`
                  : `${pricePerMonth}/mo`}
              </span>
            </div>
          </div>
        );
      },
    },
  ]);
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
  const formValues = {
    name: '',
    email: '',
    phone: '',
    isYearlyBilled: false, //False means monthly
    plan: PLAN_NAMES.ARCADE,
    addOns: ['Online service', 'Larger storage'],
  };
  const handleSubmit = (values: FormValuesInterface) => {
    console.log(values);
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
      }) => (
        <>
          <Form className={styles.container}>
            <ProgressContainer
              steps={steps}
              currentStepIndex={currentStepIndex}
              goTo={goTo}
              disabled={Object.keys(errors).length > 0}
            />
            <div className={styles.formContainer}>
              <div className={styles.formBox}>
                <h1
                  className={cx(
                    'text-style-heading',
                    styles['formBox--heading'],
                  )}
                >
                  {step.heading}
                </h1>
                <p
                  className={cx(
                    'text-style-body-l',
                    styles['formBox--description'],
                  )}
                >
                  {step.description}
                </p>
                {step.renderContent({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                })}
              </div>
            </div>
            <ControlsContainer
              steps={steps}
              currentStepIndex={currentStepIndex}
              back={back}
              next={next}
              isSubmitting={isSubmitting}
              disabled={Object.keys(errors).length > 0}
            />
          </Form>
        </>
      )}
    </Formik>
  );
};

export default FormBox;
