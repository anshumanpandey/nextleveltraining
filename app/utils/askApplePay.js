import { Alert } from "react-native";
import stripe from 'tipsi-stripe'

const askApplePay = async ({ label, amount }) => {
  try {
    const canMakePayment = await stripe.canMakeNativePayPayments()
    if (!canMakePayment) {
      Alert.alert("Error", "Make sure your credit card is set up properly")
    }

    const supportsPayment = await stripe.deviceSupportsNativePay()
    if (!supportsPayment) {
      Alert.alert("Error", "This device does not support ApplePay")
    }
    const items = [{
      label,
      amount: parseFloat(amount.toFixed(2)),
    }]

    const shippingMethods = [{
      id: 'fedex',
      label: 'FedEX',
      detail: label,
      amount: parseFloat(amount.toFixed(2)),
    }]

    const options = {
      shippingMethods,
    }

    const token = await stripe.paymentRequestWithNativePay(options, items)
    Alert.alert("Success", token)

    return stripe.completeNativePayRequest()
  } catch (err) {
    Alert.alert(err)
    stripe.cancelNativePayRequest()
    throw err
  }
}
export default askApplePay;