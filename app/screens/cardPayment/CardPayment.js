import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import Header from '../../components/header/Header'
import styles from './styles'
import {Icon} from 'native-base'
import stripe from 'tipsi-stripe'
import {CreditCardInput} from 'react-native-credit-card-input'
import useAxios from 'axios-hooks'
import {
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
} from '../../state/GlobalState'
import { Alert } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { nanoid } from 'nanoid'
import {useGlobalState} from '../../state/GlobalState'

stripe.setOptions({
  publishableKey: 'pk_live_hsdDdRGSyYxs38fMNIaAY1CD00rAm7kvcW',
})

const CardPayment = props => {

  const [profile] = useGlobalState('profile')
  const amount = props.navigation.getParam('amount', 0)
  const credits = props.navigation.getParam('credits', 0)
  const purchaseType = props.navigation.getParam('purchaseType', null)

  const [cardDetails, setCardDetails] = React.useState(null)
  const [disabled, setDisabled] = React.useState(true)

  const [stripePaymentCreateIntentRes, stripePaymentCreateIntent] = useAxios(
    {
      url: `/Users/PayWithStripe`,
      method: 'POST',
    },
    {manual: true},
  )

  const [buyCreditsReq, buyCredits] = useAxios(
    {
      url: '/Users/BuyCredits',
      method: 'POST',
    },
    {manual: true},
  )

  const [getUserReq, getUserData] = useAxios(
    {
      url: '/Users/GetUser',
    },
    {manual: true},
  )

  const [saveBookingReq, saveBooking] = useAxios(
    {
      url: '/Users/SaveBooking',
      method: 'POST',
    },
    {manual: true},
  )

  const [savePaymenReq, savePayment] = useAxios(
    {
      url: '/Users/UpdatePaymentDetails',
      method: 'POST',
    },
    {manual: true},
  )

  const _confirmPayment = async () => {
    try {
      setDisabled(true)
      const expiry = cardDetails.expiry.split('/')
      const month = expiry[0]
      const year = `20${expiry[1]}`
      const params = {
        number: cardDetails.number,
        expMonth: month,
        expYear: year,
        cvc: cardDetails.cvc,
      }
      console.log(params)
      const paymentMethod = await stripe.createPaymentMethod({
        card: params,
      })
      // console.log('method:', paymentMethod)
      const result = await stripePaymentCreateIntent({
        data: {
          amount: amount * 100,
          currency: 'gbp',
          statementDescriptor: 'next_level_descriptor',
          paymentMethodId: paymentMethod.id,
        },
      })
      if (result.status === 200) {
        // console.log(result.data)
        const payment = await stripe.confirmPaymentIntent({
          clientSecret: result.data.ClientSecret,
        })
        // console.log('payment:', payment)
        if (payment.status === 'succeeded') {
          if (purchaseType === 'booking') {
            const data = {
              playerID: profile.Id,
              coachID: props.navigation.getParam('coach').Id,
              sessions: props.navigation.getParam('sessions'),
              bookingDate: props.navigation.getParam('selectedDate'),
              trainingLocationID: props.navigation.getParam('selectedLocation')
                .id,
              amount: props.navigation.getParam('coach').Rate,
              paymentStatus: 'Processed',
              transactionID: nanoid(),
              bookingStatus: 'Done',
            }
            // console.log(data)
            saveBooking({data})
              .then(r => {
                console.log(r.data)
              })
              .finally(() => {
                Alert.alert('Succeed', 'Payment Successful!')
                const resetAction = StackActions.reset({
                  index: 0,
                  key: null,
                  actions: [
                    NavigationActions.navigate({
                      routeName: 'MainStack',
                      action: NavigationActions.navigate({
                        routeName: 'Booking',
                      }),
                    }),
                  ],
                })
                props.navigation.dispatch(resetAction)
              })
          } else if (purchaseType === 'featured') {
            const data = {paypalPaymentId: nanoid()}
            const res = await savePayment({ data })
            Alert.alert('Succeed', 'Payment Successful!')
            const resetAction = StackActions.reset({
              index: 0,
              key: null,
              actions: [
                NavigationActions.navigate({
                  routeName: 'MainStack',
                  action: NavigationActions.navigate({
                    routeName: 'succesPayFeatured',
                  }),
                }),
              ],
            })
            props.navigation.dispatch(resetAction)
          } else {
            const newData = {
              credits: credits,
              amountPaid: Math.round(amount),
            }
            const response = await buyCredits({data: newData})
            if (response.status !== 200) return
            const {data} = await getUserData()
            dispatchGlobalState({
              type: GLOBAL_STATE_ACTIONS.PROFILE,
              state: data,
            })
            Alert.alert('Succeed', 'Payment Successful!')
            const resetAction = StackActions.reset({
              index: 0,
              key: null,
              actions: [
                NavigationActions.navigate({
                  routeName: 'MainStack',
                  action: NavigationActions.navigate({
                    routeName: 'Profile',
                    action: NavigationActions.navigate({routeName: 'Wallet'}),
                  }),
                }),
              ],
            })
            props.navigation.dispatch(resetAction)
          }
        }
      }
    } catch (e) {
      console.log('err:', e)
    }
  }

  const _onChange = form => {
    setCardDetails(form.values)
    if (
      form.status.cvc === 'valid' &&
      form.status.expiry === 'valid' &&
      form.status.number === 'valid'
    ) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }

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

      <TouchableOpacity
        disabled={disabled}
        style={[styles.buttonSave, {width: 200, opacity: disabled ? 0.5 : 1}]}
        onPress={_confirmPayment}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', marginHorizontal: 10}}>Pay Now</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CardPayment
