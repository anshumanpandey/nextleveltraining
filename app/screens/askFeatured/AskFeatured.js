import React from 'react'
import { View, Text, Image, Alert, TouchableOpacity, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import useAxios from 'axios-hooks'
import Images from '../../constants/image'
import styles from './styles';
import Colors from '../../constants/color';
import askApplePay from '../../utils/askApplePay'
import NavigationService from '../../navigation/NavigationService';
import Screens from '../../utils/screen';
import GlobalContants from '../../constants/GlobalContants';


const AskFeatured = (props) => {
  const [, savePayment] = useAxios({
    url: '/Users/UpdatePaymentDetails',
    method: 'POST',
  }, { manual: true })
  return (
    <View style={styles.level_container}>
      <View style={styles.level_logo_view}>
        <Image source={Images.Logo} style={{ width: 150, height: 150 }} />
        <Text style={styles.level_logo_text}>
          Find out more about how to boost your likes , comments and bookings on
          Next Level by becoming “Featured.“
        </Text>
      </View>
      <View style={styles.level_btn_view}>
        <TouchableOpacity
          style={styles.level_btn_player}
          onPress={async () => {
            if (Platform.OS === "ios") {

              let responsePaymet = await askApplePay({ label: "Featured", price: parseInt(GlobalContants.FEATURED_PRICE, 10) })
              if (responsePaymet == true) {
                const data = { paypalPaymentId: 1 }
                setTimeout(async () => {
                  await savePayment({ data })
                  Alert.alert('Succeed', 'Payment Successful!')
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
                      if (props.navigation.getParam('redirect', false)) {
                        props.navigation.navigate('PayFeatured')
                      } else {
                        AsyncStorage.setItem('wantToBeFeatured', 'yes').then(
                          () => {
                            NavigationService.navigate(Screens.SignUp, {
                              isFeatured: true,
                              role: props.navigation.getParam('role', 'Player'),
                            })
                          },
                        )
                      }
                    },
                  },
                  {
                    text: 'Pay with Credit/Debit Card',
                    onPress: () => {
                      if (props.navigation.getParam('redirect', false)) {
                        props.navigation.navigate('CardPayment', {
                          amount: parseInt(GlobalContants.FEATURED_PRICE, 10),
                          purchaseType: 'featured',
                        })
                      } else {
                        AsyncStorage.setItem('wantToBeFeatured', 'yes').then(
                          () => {
                            NavigationService.navigate(Screens.SignUp, {
                              isFeatured: true,
                              role: props.navigation.getParam('role', 'Player'),
                            })
                          },
                        )
                      }
                    },
                  },
                ],
                { cancelable: true },
              )
            }
          }}>
          <View style={styles.level_btn_player_view}>
            <Text style={styles.level_player_text}>Go Featured</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.level_btn_coach, { backgroundColor: Colors.nl_yellow }]}
          onPress={() => {
            const backTo = props.navigation.getParam('goToOnCancel', undefined)
            if (props.navigation.getParam('redirect', false) || backTo !== undefined) {
              props.navigation.navigate(backTo || 'Search')
            } else {
              NavigationService.navigate(Screens.SignUp, {
                isFeatured: false,
                role: props.navigation.getParam('role', 'Coach'),
              })
            }
            AsyncStorage.removeItem('wantToBeFeatured')
            AsyncStorage.removeItem('askToBeFeatured')
            AsyncStorage.removeItem('justRegistered')
          }}>
          <View style={styles.level_btn_player_view}>
            <Text style={styles.level_player_text}>Not Now</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AskFeatured;