import { FC } from 'react';

import styles from './FormBox.module.css';
import ConfirmIcon from '../../assets/images/IconThankYou';

const ThankYouBox: FC = () => {
  return (
    <div className={styles.thankYouBox}>
      <ConfirmIcon />
      <h2 className={styles['thankYouBox--heading']}>Thank you!</h2>
      <p className={styles['thankYouBox--description']}>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
};

export default ThankYouBox;
