import React from 'react'
import { Alert, View } from 'react-native'
import { Icon } from 'native-base'

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

const CardPayment = props => {

  const [profile] = useGlobalState('profile')
  const amount = props.navigation.getParam('amount', 0)
  const credits = props.navigation.getParam('credits', 0)
  const purchaseType = props.navigation.getParam('purchaseType', null)

  const [cardDetails, setCardDetails] = React.useState(null)
  const [disabled, setDisabled] = React.useState(false)


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

    </View>
  )
}

export default CardPayment
