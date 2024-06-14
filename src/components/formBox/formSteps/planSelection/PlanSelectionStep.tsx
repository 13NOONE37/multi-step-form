import { FC } from 'react';
import cx from 'classnames';
import { renderContentInterface } from '../../stepType';
import styles from './PlanSelectionStep.module.css';

import FormCard from '../../../formCard/FormCard';
import Toggle from '../../../toggle/Toggle';
import { PLANS, PLAN_NAMES, YEARLY_FACTOR } from '../../formConstans';

const PlanSelectionStep: FC<renderContentInterface> = ({
  values,
  handleChange,
}) => {
  const getBillingClassName = (isActive: boolean) =>
    cx(styles['billingBar--name'], {
      [styles['billingBar--name__active']]: isActive,
    });

  return (
    <div className={styles.form}>
      <div className={styles['form--cards']}>
        {Object.values(PLAN_NAMES).map((plan_name) => {
          const { name, price, Icon } = PLANS[plan_name];

          return (
            <FormCard
              key={plan_name}
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

      <div className={styles['form--billingBar']}>
        <span className={getBillingClassName(!values.isYearlyBilled)}>
          Monthly
        </span>
        <Toggle
          name="isYearlyBilled"
          value={values.isYearlyBilled}
          onChange={handleChange}
        />
        <span className={getBillingClassName(values.isYearlyBilled)}>
          Yearly
        </span>
      </div>
    </div>
  );
};

export default PlanSelectionStep;
