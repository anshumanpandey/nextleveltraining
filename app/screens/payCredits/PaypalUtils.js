import GlobalContants from '../../constants/GlobalContants';
import {nanoid} from 'nanoid';

export const GET_PAYPAL_JSON = (amount) => {
  return {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: nanoid(),
        name: `Buy Credits`,
        description: `Buy credits in amount GBP ${amount}`,
        amount: {
          currency_code: 'GBP',
          value: amount,
        },
      },
    ],
    application_context: {
      return_url:
        'https://mobileapi.nextlevelfootballtraining.co.uk/NextLevelTrainingApi/pages/payment_success.html',
      cancel_url:
        'https://mobileapi.nextlevelfootballtraining.co.uk/NextLevelTrainingApi/pages/payment_failure.html',
    },
  };
};
