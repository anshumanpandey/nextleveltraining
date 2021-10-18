import React from 'react'
import { Alert, View } from 'react-native'
import { Icon } from 'native-base'
import stripe from 'tipsi-stripe'
import { CreditCardInput } from 'react-native-credit-card-input'
import useAxios from 'axios-hooks'
import { NavigationActions, StackActions } from 'react-navigation'
import { nanoid } from 'nanoid'
import {
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
  useGlobalState
} from '../../state/GlobalState'
import Header from '../../components/header/Header'
import NLButton from '../../components/NLButton'
import GlobalContants from '../../constants/GlobalContants'

stripe.setOptions({
  publishableKey: GlobalContants.STRIPE_KEY,
})

const CardPayment = props => {

  const [profile] = useGlobalState('profile')
  const amount = props.navigation.getParam('amount', 0)
  const credits = props.navigation.getParam('credits', 0)
  const purchaseType = props.navigation.getParam('purchaseType', null)

  const [cardDetails, setCardDetails] = React.useState(null)
  const [disabled, setDisabled] = React.useState(false)

  const [stripePaymentCreateIntentRes, stripePaymentCreateIntent] = useAxios(
    {
      url: `/Users/PayWithStripe`,
      method: 'POST',
    },
    { manual: true },
  )

  const [buyCreditsReq, buyCredits] = useAxios(
    {
      url: '/Users/BuyCredits',
      method: 'POST',
    },
    { manual: true },
  )

  const [getUserReq, getUserData] = useAxios(
    {
      url: '/Users/GetUser',
    },
    { manual: true },
  )

  const [saveBookingReq, saveBooking] = useAxios(
    {
      url: '/Users/SaveBooking',
      method: 'POST',
    },
    { manual: true },
  )

  const [savePaymenReq, savePayment] = useAxios(
    {
      url: '/Users/UpdatePaymentDetails',
      method: 'POST',
    },
    { manual: true },
  )

  const isMakingRequest = () => stripePaymentCreateIntentRes.loading === true ||
    buyCreditsReq.loading === true ||
    saveBookingReq.loading === true ||
    getUserReq.loading === true ||
    savePaymenReq.data

  const confirmPayment = async () => {
    try {
      setDisabled(true)
      const expiry = cardDetails.expiry.split('/')
      const month = expiry[0]
      const year = `20${expiry[1]}`
      const params = {
        number: cardDetails.number,
        expMonth: parseInt(month, 10),
        expYear: parseInt(year, 10),
        cvc: cardDetails.cvc,
      }
      console.log(params)
      const paymentMethod = await stripe.createPaymentMethod({
        card: params,
      })
      console.log('method:', paymentMethod)
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
            saveBooking({ data })
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
            const data = { paypalPaymentId: nanoid() }
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
              credits,
              amountPaid: Math.round(amount),
            }
            const response = await buyCredits({ data: newData })
            if (response.status !== 200) return
            const { data } = await getUserData()
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
                    action: NavigationActions.navigate({ routeName: 'Wallet' }),
                  }),
                }),
              ],
            })
            props.navigation.dispatch(resetAction)
          }
        }
      }
    } catch (e) {
      Alert.alert("Error", e.toString())
      setDisabled(false)
      console.log('err:', e)
    }
  }

  const onChange = form => {
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
    <View style={{ flex: 1, backgroundColor: '#F8F8FA' }}>
      <Header
        title="Card Details"
        hideCreatePost
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
      <CreditCardInput onChange={onChange} />

      <NLButton
        style={{ width: "55%", marginTop: "15%", marginLeft: "auto", marginRight: "auto" }}
        variant="secondary"
        value="Pay Now"
        disabled={disabled}
        loading={isMakingRequest()}
        onPress={confirmPayment} />
    </View>
  )
}

export default CardPayment
