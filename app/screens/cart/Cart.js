import React, { useEffect, useState } from "react";
import { FlatList, Text, Alert, Platform } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import useAxios from 'axios-hooks'
import Header from '../../components/header/Header'
import NLBackButton from '../../components/header/NLBackButton'
import Images from '../../constants/image'
import { Row } from '../../components/styled'
import askApplePay from '../../utils/askApplePay'
import {
  Button,
  ButtonText,
  Card,
  CardTitle,
  Container,
  Logo,
  LogoContainer,
} from './styled'
import {
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
} from '../../state/GlobalState'

const Cart = ({ navigation }) => {


  const items = [
    { credits: 1, price: 2.5 },
    { credits: 5, price: 12.5 },
    { credits: 10, price: 25 },
  ]

  return (
    <Container>
      <Header
        title="Credits"
        hideCreatePost
        customButton={() => (
          <>
            <NLBackButton navigation={navigation} />
          </>
        )}
      />

      <FlatList
        data={items}
        keyExtractor={(_, idx) => idx}
        renderItem={({ item }) => (
          <CardItem navigation={navigation} item={item} />
        )}
        ListHeaderComponent={() => (
          <LogoContainer>
            <Logo source={Images.Logo} />
          </LogoContainer>
        )}
      />
    </Container>
  )
}

const CardItem = ({ navigation, item }) => {
  const [selectedItem, setselectedItem] = useState(1);
  const [, buyCredits] = useAxios({
    url: '/Users/BuyCredits',
    method: 'POST',
  }, { manual: true })

  const [, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  let PaymentRequest = require('react-native-payments').PaymentRequest;

  const METHOD_DATA = [{
    supportedMethods: ['apple-pay'],
    data: {
      merchantIdentifier: 'merchant.com.nextleveltraining',
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      countryCode: 'US',
      currencyCode: 'EUR'
    }
  }];

  const DETAILS = {
    displayItems: [
      {
        label: 'Credits',
        amount: { currency: 'EUR', value: selectedItem }
      }

    ],
    total: {
      label: 'Credits Total',
      amount: { currency: 'USD', value: selectedItem }
    }
  };
  const OPTIONS = {

  };
  let paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS, OPTIONS);


  return (
    <Card>
      <CardTitle>Buy Credits</CardTitle>
      {item.credits === 1 ? (
        <Text style={{ fontWeight: '500' }}>About {item.credits} response</Text>
      ) : (
          <Text style={{ fontWeight: '500' }}>About {item.credits} responses</Text>
        )}

      {item.credits === 1 ? (
        <Text style={{ fontWeight: '500' }}>{item.credits} credit</Text>
      ) : (
          <Text style={{ fontWeight: '500' }}>{item.credits} credits</Text>
        )}

      <Row>
        <Text style={{ fontWeight: '700' }}>£ {item.price.toFixed(2)}</Text>
        <Text style={{ fontWeight: '500' }}> + VAT</Text>
      </Row>

      <Button
        onPress={async () => {
          setselectedItem(item.price)

          const newData = {
            credits: item.credits,
            amountPaid: Math.round(item.price),

          }
          if (Platform.OS === "ios") {


            let responsePaymet = await askApplePay({ label: "Credits", price: item.price })
            if (responsePaymet == true) {
              setTimeout(async () => {
                const response = await buyCredits({ data: newData })
                if (response.status !== 200) return
                const { data: userData } = await getUserData()
                dispatchGlobalState({
                  type: GLOBAL_STATE_ACTIONS.PROFILE,
                  state: userData,
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
                navigation.dispatch(resetAction)
              }, 1000)
              return

            }


          } else {
            Alert.alert(
              'Choose payment method',
              'How you wana pay for the credits?',
              [
                {
                  text: 'Pay with Paypal',
                  onPress: () => {
                    navigation.navigate('PayCredits', {
                      amount: item.price,
                      credits: item.credits,
                      purchaseType: 'coins',
                    })
                  },
                },
                {
                  text: 'Pay with Credit/Debit Card',
                  onPress: () => {
                    navigation.navigate('CardPayment', {
                      amount: item.price,
                      credits: item.credits,
                      purchaseType: 'coins',
                    })
                  },
                },
              ],
              { cancelable: true },
            )
          }
        }}>
        <ButtonText>Buy credits</ButtonText>
      </Button>


    </Card>
  )
}

export default Cart
