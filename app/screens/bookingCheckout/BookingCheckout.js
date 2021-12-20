import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native'
import { parseISO, format } from 'date-fns'
import { NavigationActions, StackActions } from 'react-navigation'
import useAxios from 'axios-hooks'
import Header from '../../components/header/Header'
import NLBackButton from '../../components/header/NLBackButton'
import Colors from '../../constants/color'
import NLButton from '../../components/NLButton';
import { getTotalBookingPrice } from '../payments/PaypalUtils';
import GlobalContants from '../../constants/GlobalContants';
import NavigationService from '../../navigation/NavigationService';
import askApplePay from '../../utils/askApplePay'
import {
  useGlobalState
} from '../../state/GlobalState'

const BookingCheckout = (props) => {
  const [profile] = useGlobalState('profile')
  const [currentSessions, setCurrentSessions] = useState([]);
  const coach = props.navigation.getParam("coach")
  const sessions = props.navigation.getParam("sessions")
  const selectedLocation = props.navigation.getParam("selectedLocation")

  const [, savePayment] = useAxios({
    url: '/Users/UpdatePaymentDetails',
    method: 'POST',
  }, { manual: true })

  const [, saveBooking] = useAxios({
    url: '/Users/SaveBooking',
    method: 'POST',
  }, { manual: true })

  useEffect(() => {
    setCurrentSessions(sessions)
  }, [sessions])

  const deleteSession = (toDelete) => {
    const map = new Map(currentSessions.map(s => ([`${s.BookingDate}-${s.TimeTag}`, s])))

    if (map.has(`${toDelete.BookingDate}-${toDelete.TimeTag}`)) {
      map.delete(`${toDelete.BookingDate}-${toDelete.TimeTag}`)
    }

    setCurrentSessions(Array.from(map.values()))
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
      <Header
        title="Checkout"
        hideCreatePost
        toggleDrawer={props.navigation.toggleDrawer}
        navigate={props.navigation.navigate}
        customButton={() => (
          <NLBackButton navigation={props.navigation} />
        )}
      />
      <View style={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ paddingLeft: '5%', width: '50%' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Training session with</Text>
            <Text style={{ fontSize: 18 }}>{coach.FullName}</Text>
          </View>

          <View style={{ paddingRight: '5%', width: '50%' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>Training Location</Text>
            <Text style={{ fontSize: 14, textAlign: 'right' }}>{selectedLocation.LocationAddress}</Text>
          </View>
        </View>

        <View style={{ marginLeft: '5%', marginTop: '5%', backgroundColor: '#00000010' }}>
          {currentSessions.map(session => (
            <View style={{ paddingHorizontal: '8%', paddingVertical: '3%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ffffff' }}>
              <View>
                <Text style={{ fontSize: 16 }}>Day: {format(parseISO(session.BookingDate), "EEEE, dd-MM-yyyy")}</Text>
                <Text style={{ fontSize: 15 }}>Starting at {session.FromTime} to {session.ToTime}</Text>
                <Text style={{ fontSize: 15 }}>Price of £{coach.Rate}</Text>
                <Text style={{ fontSize: 12 }}>Next Level comission of £{GlobalContants.BOOKING_COMISSION}</Text>
              </View>
              {currentSessions.length > 1 && (
                <TouchableOpacity onPress={() => deleteSession(session)} style={{ backgroundColor: '#ffffff90', padding: 10, borderRadius: 10 * 2 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>X</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={{ marginTop: 'auto', backgroundColor: '#00000010', marginTop: '5%', marginBottom: '5%' }}>
          <Text style={{ fontSize: 22, textAlign: 'center' }}>Total of £{getTotalBookingPrice(coach, currentSessions)}</Text>
        </View>

        <NLButton
          color={Colors.s_blue}
          onPress={async () => {
            if (Platform.OS === "ios") {
              setselectedItem(parseInt(getTotalBookingPrice(coach, currentSessions), 10))

              const data = {
                playerID: profile.Id,
                coachID: coach.Id,
                sessions: currentSessions,
                bookingDate: props.navigation.getParam('selectedDate'),
                trainingLocationID: selectedLocation.id,
                amount: parseInt(getTotalBookingPrice(coach, currentSessions), 10),
                paymentStatus: 'Processed',
                transactionID: '1',
                bookingStatus: 'Done',
              }
              Alert.alert(
                'Choose payment method',
                'How you wana pay for the credits?',
                [

                  {
                    text: 'Apple Pay',
                    onPress: () => {
                      paymentRequest.canMakePayments().then((canMakePayment) => {
                        if (canMakePayment) {

                          paymentRequest.show()
                            .then(paymentResponse => {
                              paymentResponse.complete('success');
                              setTimeout(async () => {
                                await saveBooking({ data })
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
                              }, 1000)
                              return

                            }).catch(r => paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS))
                        }
                        else {
                          console.log('Cant Make Payment')
                        }
                      })
                    },
                  },
                ],
                { cancelable: true },
              )
            } else {
              Alert.alert(
                'Choose payment method',
                'How you wana pay for the credits?',
                [
                  {
                    text: 'Pay with Paypal',
                    onPress: () => {
                      NavigationService.navigate('PaymentConcent', {
                        coach,
                        selectedLocation,
                        sessions: currentSessions,
                      })
                    },
                  },
                  {
                    text: 'Pay with Credit/Debit Card',
                    onPress: () => {
                      props.navigation.navigate('CardPayment', {
                        amount: parseInt(getTotalBookingPrice(coach, currentSessions), 10),
                        coach,
                        selectedLocation,
                        sessions: currentSessions,
                        purchaseType: 'booking',
                      })
                    },
                  },
                ],
                { cancelable: true },
              )
            }
          }}
          value="Pay"
          style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: '10%' }}
        />
      </View>
    </ScrollView>
  )
}

export default BookingCheckout
