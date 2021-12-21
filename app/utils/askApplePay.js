import { Alert } from 'react-native'

let PaymentRequest = require('react-native-payments').PaymentRequest;
const askApplePay = async ({ amount }) => {


  const METHOD_DATA = [{
    supportedMethods: ['apple-pay'],
    data: {
      merchantIdentifier: 'merchant.com.nextleveltraining',
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      countryCode: 'US',
      currencyCode: 'EUR'
    }
  }];

  const DETAILS = {
    displayItems: [
      {
        label: 'Credits',
        amount: { currency: 'EUR', value: amount }
      }

    ],
    total: {
      label: 'Credits Total',
      amount: { currency: 'USD', value: amount }
    }
  };
  const OPTIONS = {

  };
  let paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS, OPTIONS);

  paymentRequest.canMakePayments().then((canMakePayment) => {
    if (canMakePayment) {

      paymentRequest.show()
        .then(paymentResponse => {
          paymentResponse.complete('success');
          return true
        }).catch(r => paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS))
    }
    else {
      console.log('Cant Make Payment')
    }
  }).catch(r => paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS))
}
export default askApplePay;