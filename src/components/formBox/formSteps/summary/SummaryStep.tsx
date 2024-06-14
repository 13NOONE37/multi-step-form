import { FC } from 'react';
import { renderContentInterface } from '../../stepType';

import styles from './SummaryStep.module.css';
import { ADD_ONS, PLANS, YEARLY_FACTOR } from '../../formConstans';

const SummaryStep: FC<renderContentInterface> = ({ values, setFieldValue }) => {
  const currentPlan = PLANS[values.plan];
  const currentAddOns = values.addOns.map(
    (name) => ADD_ONS[name as keyof typeof ADD_ONS],
  );

  const pricePerMonth =
    currentPlan.price +
    currentAddOns.reduce((acc, addOn) => acc + addOn.price, 0);

  const getPriceString = (price: number) =>
    values.isYearlyBilled ? `$${price * YEARLY_FACTOR}/yr` : `$${price}/mo`;

  return (
    <div className={styles.form}>
      <div className={styles['form--summaryBox']}>
        <div className={styles['summaryBox--plan']}>
          <span className={styles['summaryBox--plan--name']}>
            {currentPlan.name} ({values.isYearlyBilled ? 'Yearly' : 'Monthly'})
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
            {getPriceString(currentPlan.price)}
          </span>
        </div>
        <ul className={styles['summaryBox--addOns']}>
          {currentAddOns.map(({ name, price }) => (
            <li key={name}>
              <span className={styles['summaryBox--addOns--name']}>{name}</span>
              <span className={styles['summaryBox--addOns--price']}>
                +{getPriceString(price)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles['form--totalBox']}>
        <span className={styles['totalBox--description']}>
          {values.isYearlyBilled ? 'Total (per year)' : 'Total (per month)'}
        </span>
        <span className={styles['totalBox--price']}>
          +{getPriceString(pricePerMonth)}
        </span>
      </div>
    </div>
  );
};

export default SummaryStep;
