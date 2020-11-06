import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, Image, TouchableWithoutFeedback, TouchableOpacity, Modal } from 'react-native';
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';
import { Text, View, CheckBox, Spinner } from 'native-base';
import Header from '../../components/header/Header';
import Images from '../../constants/image';
import Colors from '../../constants/color';
import { GET_PAYPAL_JSON } from "./PaypalUtils"
import { WebView } from 'react-native-webview';
import useAxios from 'axios-hooks'
import { useGlobalState } from '../../state/GlobalState';
import { NavigationActions, StackActions } from 'react-navigation';
import GlobalContants from '../../constants/GlobalContants';
import AsyncStorage from '@react-native-community/async-storage';
import { UsePaypalHook } from '../../utils/UsePaypalHook';
var qs = require('qs');
var UrlParser = require('url-parse');


const PaymentConcentScreen = (props) => {
  const webview = useRef(null)
  const [profile] = useGlobalState('profile')

  const [apiCalled, setApiCalled] = useState(false);
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { generatePaymentOrderReq, getAccessTokenReq,generatePaymentOrderFor, capturePaymentForToken } = UsePaypalHook();

  const [savePaymenReq, savePayment] = useAxios({
    url: '/Users/UpdatePaymentDetails',
    method: 'POST'
  }, { manual: true })

  const isLoading = () => getAccessTokenReq.loading || generatePaymentOrderReq.loading

  useEffect(() => {
    AsyncStorage.removeItem("wantToBeFeatured")
    AsyncStorage.removeItem("askToBeFeatured")
  },[])

  return (
    <ScrollView hide style={{ flex: 1, backgroundColor: 'white' }}>
      <Header toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} hideCreatePost={true} />
      <View style={{ backgroundColor: '#f0f2f3', marginTop: '10%' }}>
        <View style={{ paddingHorizontal: '5%', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ fontSize: 30 }}>£ {GlobalContants.FEATURED_PRICE}</Text>
          <Text style={{ fontSize: 30 }}>Pay now</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: '5%', alignItems: "center", marginTop: '5%' }}>
        <Image source={Images.PaypalLogo} />
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
          1 week on feature tab. Expose your profile to the wider audience which includes post on social media.
        </Text>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
          You will be redirected to PayPal's website to acess your account and submit your payment. Then you will return to Next Level App
        </Text>
        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', marginTop: '5%' }}>
          <CheckBox color={Colors.g_text} checked={checked} onPress={() => setChecked(p => !p)} />
          <TouchableWithoutFeedback onPress={() => setChecked(p => !p)}>
            <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={{ fontSize: 16 }}>
                I have read understood and accepted
          </Text>
              <Text style={{ fontSize: 16 }}>
                {' '}Next Level{' '}
              </Text>
              <Text onPress={() => navigation.navigate('TermsConditions')} style={{ color: Colors.g_text, fontSize: 16 }}>
                Terms & Conditions
          </Text>
              <Text style={{ fontSize: 16 }}>
                {' '}and{' '}
              </Text>
              <Text onPress={() => navigation.navigate('Policy')} style={{ color: Colors.g_text, fontSize: 16 }}>
                Privacy Policy.
          </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <TouchableOpacity
          disabled={!checked}
          style={[styles.buttonSave, { width: 200, opacity: checked ? 1 : 0.5 }]}
          onPress={() => {
            console.log(GET_PAYPAL_JSON())
            generatePaymentOrderFor(GET_PAYPAL_JSON())
            .then((res) => {
              console.log(res.data)
              setOpenModal(res.data.links.find(i => i.rel == 'approve').href)
            })
            .catch(err => {
              console.log(err);
              if (err.response) {
                console.log(err.response.data);
              }
            })
              
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Pay Now</Text>
            {isLoading() && <Spinner color={Colors.s_yellow} />}
          </View>
        </TouchableOpacity>
      </View>
      {openModal && (
        <Modal>
          <WebView
            style={{ flex: 1 }}
            ref={ref => (webview.current = ref)}
            source={{ uri: openModal }}
            onNavigationStateChange={(e) => {
              const { url } = e;
              console.log('webview', url)
              if (!url) return;

              const parsed = new UrlParser(url)
              const urlParams = qs.parse(parsed.query.substring(1))

              console.log('success', urlParams)
              if (url.includes('PayerID')) {
                if (apiCalled == true || savePaymenReq.loading == true) return
                capturePaymentForToken(urlParams.token, GET_PAYPAL_JSON())
                .then((captureRes) => {
                  console.log(captureRes.data)
                  const data = {
                    "paypalPaymentId": captureRes.data.id,
                  }
                  console.log(data)
                  savePayment({ data })
                    .then(r => {
                      setApiCalled(true)
                      console.log(r.data)
                    })
                    .finally(() => {
                      setOpenModal(false)
                      const resetAction = StackActions.reset({
                        index: 0,
                        key: null,
                        actions: [NavigationActions.navigate({ routeName: 'MainStack', action: NavigationActions.navigate({ routeName: 'succesPayFeatured' }) })]
                      })
                      props.navigation.dispatch(resetAction);
                    })
                })
              }
              if (url.includes('payment_failure')) {
                console.log('cancelled')
                setOpenModal(false)
              }
            }}
          />
        </Modal>
      )}
    </ScrollView>
  );
};

export default PaymentConcentScreen;
