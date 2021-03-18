import React from 'react'
import { View } from 'react-native'
import Header from '../../components/header/Header'
import {Icon} from 'native-base'
import stripe from 'react-native-stripe-payments';
import {
  CreditCardInput
} from 'react-native-credit-card-input'

stripe.setOptions({ publishingKey: 'pk_live_hsdDdRGSyYxs38fMNIaAY1CD00rAm7kvcW' });

const CardPayment = (props) => {

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

  const _onChange = form => console.log(form)
  
  return (
    <View style={{flex: 1, backgroundColor: '#F8F8FA'}}>
      <Header
        title="Card Details"
        hideCreatePost={true}
        customButton={() => (
          <Icon
            onPress={() => props.navigation.goBack()}
            type="Feather"
            name="arrow-left"
            style={{
              position: 'absolute',
              left: 15,
              fontSize: 22,
              zIndex: 1,
              color: '#2D7AF0',
            }}
          />
        )}
      />
      <CreditCardInput onChange={_onChange} />
    </View>
  )
}

export default CardPayment;