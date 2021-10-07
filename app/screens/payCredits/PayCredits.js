import React, { useState, useRef, useEffect } from 'react'
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
} from 'react-native'
import { Text, View, Spinner } from 'native-base'
// eslint-disable-next-line import/no-unresolved
import CheckBox from '@react-native-community/checkbox';
import { WebView } from 'react-native-webview'
import useAxios from 'axios-hooks'
import qs from 'qs'
import UrlParser from 'url-parse'
import styles from './styles'
import Header from '../../components/header/Header'
import Images from '../../constants/image'
import Colors from '../../constants/color'
import { GET_PAYPAL_JSON } from './PaypalUtils'
import { UsePaypalHook } from '../../utils/UsePaypalHook'
import {
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
} from '../../state/GlobalState'

const PayCredits = props => {
  const amount = props.navigation.getParam('amount', 0)
  const credits = props.navigation.getParam('credits', 0)
  const purchaseType = props.navigation.getParam('purchaseType', null)

  const webview = useRef(null)

  const [json, setJson] = useState()
  const [apiCalled, setApiCalled] = useState(false)
  const [checked, setChecked] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    setJson(GET_PAYPAL_JSON(amount))
  }, [amount])

  const {
    generatePaymentOrderReq,
    getAccessTokenReq,
    generatePaymentOrderFor,
    capturePaymentForToken,
  } = UsePaypalHook()

  const [, buyCredits] = useAxios(
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

  const generateOrder = async () => {
    console.log('json', json)
    try {
      const { data } = await generatePaymentOrderFor(json)
      setOpenModal(data.links.find(i => i.rel == 'approve').href)
    } catch (error) {
      console.log(error)
      if (error.response) console.log(error.response.data)
    }
  }

  const onPageLoad = async ({ nativeEvent: { url } }) => {
    console.log('webview', url)
    if (!url) return

    const parsed = new UrlParser(url)
    const urlParams = qs.parse(parsed.query.substring(1))

    console.log('urlParams', urlParams)

    if (url.includes('PayerID')) {
      setPageLoading(true)
      if (apiCalled) return
      try {
        const { data } = await capturePaymentForToken(urlParams.token, json)
        console.log(data)

        await onPaymentSuccess(data.id)
        setApiCalled(true)
        setOpenModal(false)
        props.navigation.navigate('SuccessPayCredits')
      } catch (error) {
        console.log('capturePaymentForToken error', error)
        setOpenModal(false)
        Alert.alert('Payment failed', 'Unable to capture payment')
      }
    }

    if (url.includes('payment_failure')) {
      console.log('cancelled')
      setOpenModal(false)
      props.navigation.goBack()
    }
    setPageLoading(false)
  }

  const onPaymentSuccess = async paymentId => {
    const newData = {
      credits,
      amountPaid: amount,
      paypalPaymentId: paymentId,
    }
    console.log('buyCredits', newData)

    try {
      const response = await buyCredits({ data: newData })
      if (response.status !== 200) return
      const { data } = await getUserData()
      dispatchGlobalState({
        type: GLOBAL_STATE_ACTIONS.PROFILE,
        state: data,
      })
    } catch (error) {
      console.log('buyCredits error', error)
    }
  }

  const isLoading = () =>
    getAccessTokenReq.loading || generatePaymentOrderReq.loading

  return (
    <ScrollView hide style={{ flex: 1, backgroundColor: 'white' }}>
      <Header
        toggleDrawer={props.navigation.toggleDrawer}
        navigate={props.navigation.navigate}
        hideCreatePost
      />
      <View style={{ backgroundColor: '#f0f2f3', marginTop: '10%' }}>
        <View
          style={{
            paddingHorizontal: '5%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text style={{ fontSize: 30 }}>£ {amount}</Text>
          <Text style={{ fontSize: 30 }}>Pay now</Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: '5%',
          alignItems: 'center',
          marginTop: '5%',
        }}>
        <Image source={Images.PaypalLogo} />
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
          Find out more about how to boost your likes , comments and bookings on
          Next Level by becoming “Featured.“
        </Text>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
          You will be redirected to PayPal's website to acess your account and
          submit your payment. Then you will return to Next Level App
        </Text>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: '5%',
          }}>
          <CheckBox
            color={Colors.g_text}
            value={checked}
            onValueChange={() => setChecked(p => !p)}
          />
          <TouchableWithoutFeedback onPress={() => setChecked(p => !p)}>
            <View
              style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={{ fontSize: 16 }}>
                I have read understood and accepted
              </Text>
              <Text style={{ fontSize: 16 }}> Next Level </Text>
              <Text
                onPress={() => props.navigation.navigate('TermsConditions')}
                style={{ color: Colors.g_text, fontSize: 16 }}>
                Terms & Conditions
              </Text>
              <Text style={{ fontSize: 16 }}> and </Text>
              <Text
                onPress={() => props.navigation.navigate('Policy')}
                style={{ color: Colors.g_text, fontSize: 16 }}>
                Privacy Policy.
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <TouchableOpacity
          disabled={!checked}
          style={[styles.buttonSave, { width: 200, opacity: checked ? 1 : 0.5 }]}
          onPress={generateOrder}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', marginHorizontal: 10 }}>Pay Now</Text>
            {isLoading() && <Spinner color={Colors.s_yellow} />}
          </View>
        </TouchableOpacity>
      </View>

      {openModal && (
        <Modal>
          <SafeAreaView style={{ flex: 1 }}>
            {pageLoading && (
              <View style={{ height: '100%', justifyContent: 'center' }}>
                <Spinner color={Colors.g_text} />
              </View>
            )}
            <WebView
              style={{ flex: 1 }}
              ref={ref => (webview.current = ref)}
              source={{ uri: openModal }}
              onLoadStart={() => setPageLoading(true)}
              onLoadEnd={onPageLoad}
            />
          </SafeAreaView>
        </Modal>
      )}
    </ScrollView>
  )
}

export default PayCredits
