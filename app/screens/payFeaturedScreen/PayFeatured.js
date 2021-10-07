import React, { useState, useRef, useEffect } from 'react'
import {
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  SafeAreaView
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, View, Spinner } from 'native-base'
// eslint-disable-next-line import/no-unresolved
import CheckBox from '@react-native-community/checkbox';
import { WebView } from 'react-native-webview'
import useAxios from 'axios-hooks'
import qs from 'qs'
import { NavigationActions, StackActions } from 'react-navigation'
import UrlParser from 'url-parse'
import styles from './styles'
import Header from '../../components/header/Header'
import Images from '../../constants/image'
import Colors from '../../constants/color'
import { GET_PAYPAL_JSON } from './PaypalUtils'
import GlobalContants from '../../constants/GlobalContants'
import { UsePaypalHook } from '../../utils/UsePaypalHook'

const PaymentConcentScreen = props => {
  const webview = useRef(null)

  const [json, setJson] = useState()
  const [apiCalled, setApiCalled] = useState(false)
  const [checked, setChecked] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)

  const {
    generatePaymentOrderReq,
    getAccessTokenReq,
    generatePaymentOrderFor,
    capturePaymentForToken,
  } = UsePaypalHook()

  const [savePaymenReq, savePayment] = useAxios(
    {
      url: '/Users/UpdatePaymentDetails',
      method: 'POST',
    },
    { manual: true },
  )

  const isLoading = () =>
    getAccessTokenReq.loading || generatePaymentOrderReq.loading

  useEffect(() => {
    setJson(GET_PAYPAL_JSON())
    AsyncStorage.removeItem('wantToBeFeatured')
    AsyncStorage.removeItem('askToBeFeatured')
  }, [])

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
      if (apiCalled || savePaymenReq.loading == true) return
      try {
        const { data } = capturePaymentForToken(urlParams.token, json)
        console.log(data)

        await onPaymentSuccess(data)
        setApiCalled(true)
        setOpenModal(false)
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
      } catch (error) {
        console.log('capturePaymentForToken error', error)
        setOpenModal(false)
      }
    }

    if (url.includes('payment_failure')) {
      console.log('cancelled')
      setOpenModal(false)
    }
    setPageLoading(false)
  }

  const onPaymentSuccess = async paymentId => {
    const data = { paypalPaymentId: paymentId }
    const res = await savePayment({ data })
    console.log(res)
  }

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
          <Text style={{ fontSize: 30 }}>£ {GlobalContants.FEATURED_PRICE}</Text>
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
          Find out more about how to boost your likes, comments and bookings on
          Next Level by becoming "Featured."
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
                onPress={() => navigation.navigate('TermsConditions')}
                style={{ color: Colors.g_text, fontSize: 16 }}>
                Terms & Conditions
              </Text>
              <Text style={{ fontSize: 16 }}> and </Text>
              <Text
                onPress={() => navigation.navigate('Policy')}
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
            <Text style={{ color: 'white' }}>Pay Now</Text>
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

export default PaymentConcentScreen
