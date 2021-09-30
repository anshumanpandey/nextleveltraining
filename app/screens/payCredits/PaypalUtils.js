import { nanoid } from 'nanoid';
import GlobalContants from '../../constants/GlobalContants';

export const GET_PAYPAL_JSON = (amount) => ({
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
});
