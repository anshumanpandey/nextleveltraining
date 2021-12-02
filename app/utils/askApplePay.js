import { Alert } from 'react-native'
import stripe from 'tipsi-stripe'

const askApplePay = async ({ label, amount }) => {
  const canMake = await stripe.canMakeNativePayPayments()
  if (!canMake) {
    Alert.alert("Error", "Payments not supported")
  }
  const supportPayment = await stripe.deviceSupportsNativePay()
  if (!supportPayment) {
    Alert.alert("Error", "Device does not support native payment")
  }
  try {
    const token = await stripe.paymentRequestWithNativePay(
      {
        // requiredBillingAddressFields: ['all'],
        // requiredShippingAddressFields: ['all'],
        shippingMethods: [
          {
            id: 'fedex',
            label: 'FedEX',
            detail: 'Test @ 10',
            amount: '10.00',
          },
        ],
      },
      [
        {
          label: 'Whisky',
          amount: '50.00',
        },
        {
          label: 'Vine',
          amount: '60.00',
        },
        {
          label: 'Tipsi',
          amount: '110.00',
        },
      ]
    )

    await stripe.completeNativePayRequest()
    return token;
  } catch (error) {
    await stripe.cancelNativePayRequest();
    throw error
  }
}
export default askApplePay;