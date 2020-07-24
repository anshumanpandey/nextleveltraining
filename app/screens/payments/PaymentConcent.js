import React, { useState, useRef } from 'react';
import { ScrollView, Image, TouchableWithoutFeedback, TouchableOpacity, Modal } from 'react-native';
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';
import { Text, View, CheckBox, Spinner } from 'native-base';
import Header from '../../components/header/Header';
import Images from '../../constants/image';
import Colors from '../../constants/color';
import { GET_PAYPAL_JSON } from "./PaypalUtils"
import base64 from 'react-native-base64'
import { makeUseAxios } from 'axios-hooks'
import { WebView } from 'react-native-webview';
import useAxios from 'axios-hooks'
import { useGlobalState } from '../../state/GlobalState';
var qs = require('qs');

const simpleAxiosHook = makeUseAxios()

const params = new URLSearchParams();
params.append('grant_type', 'client_credentials');

const PaymentConcentScreen = (props) => {
  const webview = useRef(null)
  const [profile] = useGlobalState('profile')

  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [saveBookingReq, saveBooking] = useAxios({
    url: '/Users/SaveBooking',
    method: 'POST'
  }, { manual: true })

  const [{ data, loading, error }, getAccessToken] = simpleAxiosHook({
    url: `https://api.sandbox.paypal.com/v1/oauth2/token`,
    method: 'POST',
    params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${base64.encode(`AcDoYg60CAk48yIdgpLTKR8h99G9sdv_Xmdg8jzd8HTla_01m29inTc7d-kT5MdRwYcnpq5GmrdXbt4A:ENs8H1feFUXDKdKOf3WZbqpFOempJlLR13ntsM7VwzuaJIzK-aRuRh_z9yVS2zuCldnTDyj19elOdZFO`)}`,
    },
  }, { manual: true })

  const [paymentReq, doPayment] = simpleAxiosHook({
    url: 'https://api.sandbox.paypal.com/v1/payments/payment',
    method: 'POST'
  }, { manual: true })

  const isLoading = () => loading || paymentReq.loading

  return (
    <ScrollView hide style={{ flex: 1, backgroundColor: 'white' }}>
      <Header toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} hideCreatePost={true} />
      <View style={{ backgroundColor: '#f0f2f3', marginTop: '10%' }}>
        <View style={{ paddingHorizontal: '5%', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ fontSize: 30 }}>£ {props.navigation.getParam('coach').Rate}</Text>
          <Text style={{ fontSize: 30 }}>Pay now</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: '5%', alignItems: "center", marginTop: '5%' }}>
        <Image source={Images.PaypalLogo} />
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
          You will be redirected to PayPal's website to acess your account and submit your payment.\nThen you will be return to Right Cars App to obtain your booking confirmation
        </Text>
        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', marginTop: '5%' }}>
          <CheckBox color={Colors.s_yellow} checked={checked} onPress={() => setChecked(p => !p)} />
          <TouchableWithoutFeedback onPress={() => setChecked(p => !p)}>
            <View style={{ width: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={{ fontSize: 16 }}>
                I have read understood and accepted
          </Text>
              <Text style={{ fontSize: 16 }}>
                {' '}Next Level{' '}
              </Text>
              <Text onPress={() => navigation.navigate('TermsConditions')} style={{ color: Colors.s_yellow, fontSize: 16 }}>
                Terms & Conditions
          </Text>
              <Text style={{ fontSize: 16 }}>
                {' '}and{' '}
              </Text>
              <Text onPress={() => navigation.navigate('Policy')} style={{ color: Colors.s_yellow, fontSize: 16 }}>
                Privacy Policy.
          </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <TouchableOpacity
          disabled={!checked}
          style={[styles.buttonSave, { width: 200, opacity: checked ? 1 : 0.5 }]}
          onPress={() => {
            console.log(0)
            getAccessToken()
              .then((res) => {
                return doPayment({
                  headers: {
                    'Authorization': `Bearer ${res.data.access_token}`
                  },
                  data: GET_PAYPAL_JSON(props.navigation.getParam('coach'))
                })
              })
              .then((res) => {
                setOpenModal(res.data.links.find(i => i.method == 'REDIRECT').href)
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
            <Text style={{ color: 'white' }}>Save</Text>
            {isLoading() && <Spinner color={Colors.s_yellow} />}
          </View>
        </TouchableOpacity>
      </View>
      {openModal && (
        <Modal>
          <WebView
            style={{ flex: 1, backgroundColor: 'blue' }}
            ref={ref => (webview.current = ref)}
            source={{ uri: openModal }}
            onNavigationStateChange={(e) => {
              const { url } = e;
              console.log('webview', url)
              if (!url) return;

              //console.log(new URL(url))

              if (url.includes('PAYMENT_SUCCESS')) {
                console.log('success')
                const data = {
                  "playerID": profile.Id,
                  "bookingNumber": 1,
                  "coachID": props.navigation.getParam('coach').Id,
                  "fromTime": "2020-07-23T22:21:51.005Z",
                  "toTime": "2020-07-23T22:21:51.005Z",
                  "sentDate": "2020-07-23T22:21:51.005Z",
                  "trainingLocationID": props.navigation.getParam('selectedLocation').id,
                  "amount": 1,
                  "paymentStatus": "Processed",
                  "transactionID": qs.parse(url).PayerID,
                  "bookingStatus": "Done"
                }
                saveBooking({ data })
                .then(r => console.log(r.data))
                .finally(() => {
                  setOpenModal(false)
                  NavigationService.navigate("Booking")
                })
              }
              if (url.includes('PAYMENT_CANCELLED')) {
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
