import ApplePay from "react-native-apple-payment";

const askApplePay = async ({ label, amount }) => {
  const method = {
    countryCode: "GB",
    currencyCode: "GBP",
    supportedNetworks: ["Visa", "MasterCard"],
    merchantIdentifier: "merchant.Nextlevel"
  }
  const details = {
    total: {
      label,
      amount
    }
  }
  const payment = new ApplePay(method, details);

  await payment.canMakePayments()

  const paymentResponse = await payment.initApplePay()

  return paymentResponse
}
export default askApplePay;