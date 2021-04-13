import React from 'react'
import {View} from 'react-native'
import Header from '../../components/header/Header'
import {Icon} from 'native-base'
import stripe from 'tipsi-stripe'
import {CreditCardInput} from 'react-native-credit-card-input'
import useAxios from 'axios-hooks'

stripe.setOptions({
  publishableKey: 'pk_test_x7ILp8ZkceqUqaIxDWAiBsLi00Fz2vPqrZ',
})

const CardPayment = props => {
  const amount = props.navigation.getParam('amount', 0)
  const credits = props.navigation.getParam('credits', 0)
  const purchaseType = props.navigation.getParam('purchaseType', null)

  const [spritePaymentReq, stripePaymentSecret] = useAxios(
    {
      url: `/Users/PayWithStripe`,
      method: 'POST',
      data: {
        amount: amount * 100,
        currency: 'gbp',
        statementDescriptor: 'next_level_descriptor',
      },
    },
    {manual: true},
  )

  React.useEffect(() => {
    _confirmPayment()
  }, [])

  const _cardValid = () => {
    const isCardValid = stripe.isCardValid({
      number: '4242424242424242',
      expMonth: 10,
      expYear: 25,
      cvc: '888',
    })
    return isCardValid
  }

  const _confirmPayment = async () => {
    try {
      const result = await stripePaymentSecret()
      if (result.status === 200) {
        const params = {
          number: '4242424242424242',
          expMonth: 12,
          expYear: 2025,
          cvc: '888',
        }

        const paymentMethod = await stripe.createPaymentMethod({
          card: params,
        })
        
        console.log("method:", paymentMethod)
        const payment = await stripe.confirmSetupIntent({
          clientSecret: result.data.ClientSecret,
          paymentMethodId: paymentMethod.id,
          paymentMethod,
        })
        console.log('payment:', payment)
      }
    } catch (e) {
      console.log('err:', e)
    }
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

export default CardPayment
