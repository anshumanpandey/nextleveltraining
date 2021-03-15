import React from 'react'
import { View, Text } from 'react-native'
import stripe from 'react-native-stripe-payments';

stripe.setOptions({ publishingKey: 'pk_live_hsdDdRGSyYxs38fMNIaAY1CD00rAm7kvcW' });

const CardPayment = () => {

  _cardValid = () => {
    const isCardValid = stripe.isCardValid({
      number: '4242424242424242',
      expMonth: 10,
      expYear: 21,
      cvc: '888',
    });
    return isCardValid;
  }

  _confirmPayment = () => {
    const cardDetails = {
      number: '4242424242424242',
      expMonth: 10,
      expYear: 21,
      cvc: '888',
    }
    stripe.confirmPayment('client_secret_from_backend', cardDetails)
      .then(result => {
        // result of type PaymentResult
      })
      .catch(err =>
        // error performing payment
        console.log(err)
      )
  }


  return (
    <View>
      <Text>Card Payment</Text>
    </View>
  )
}

export default CardPayment;