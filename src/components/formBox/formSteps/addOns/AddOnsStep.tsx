import { FC } from 'react';
import { renderContentInterface } from '../../stepType';
import styles from './AddOnsStep.module.css';
import FormCheckbox from '../../../formCheckbox/FormCheckbox';
import { ADD_ONS, ADD_ON_NAMES, YEARLY_FACTOR } from '../../formConstans';

const AddOnsStep: FC<renderContentInterface> = ({ values, handleChange }) => {
  return (
    <div className={styles.form}>
      {Object.values(ADD_ON_NAMES).map((addOnName, index) => {
        const { name, description, price } = ADD_ONS[addOnName];

        return (
          <FormCheckbox
            key={name}
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
            focusOnRender={index === 0}
          />
        );
      })}
    </div>
  );
};

export default AddOnsStep;
