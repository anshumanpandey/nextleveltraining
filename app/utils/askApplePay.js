import { Alert } from "react-native";

const { PaymentRequest } = require('react-native-payments');

const askApplePay = async ({ label, amount }) => {
  try {
    const METHOD_DATA = [{
      supportedMethods: ['apple-pay'],
      data: {
        merchantIdentifier: 'Y77A2C426U.merchant.Nextlevel',
        supportedNetworks: ['visa', 'mastercard', 'amex'],
        countryCode: 'GB',
        currencyCode: 'GBP'
      }
    }];
    const DETAILS = {
      id: 'basic-example',
      displayItems: [
        {
          label,
          amount: { currency: 'GBP', value: amount }
        }
      ],
      total: {
        label,
        amount: { currency: 'GBP', value: amount }
      }
    };
    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
    return paymentRequest.show()
      .then(paymentResponse => {
        const { transactionIdentifier } = paymentResponse.details;
        return transactionIdentifier
      });

  } catch (err) {
    Alert.alert(err)
    throw err
  }
}
export default askApplePay;