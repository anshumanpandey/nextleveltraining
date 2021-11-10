import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native'
import useAxios from 'axios-hooks'
import AsyncStorage from '@react-native-community/async-storage';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin } from 'react-native-google-signin';
import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthError
} from '@invertase/react-native-apple-authentication';
import DeviceInfo from 'react-native-device-info';
import JwtDecode from 'jwt-decode';
import { askToBefeatured, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';
import NLUserDataForm from '../../components/userDataForm/NLUserDataForm';
import Screen from '../../utils/screen';
import styles from './styles';
import Images from '../../constants/image'
import { RequestDeviceToken } from '../../utils/firebase/RequestDeviceToken';
import GlobalContants from '../../constants/GlobalContants';

const Signup = (props) => {
  const [socialLogin, setSocialLogin] = useState(false);
  const [termWasAccepted, setTermWasAccepted] = useState(false);

  const [{ data, loading, error }, register] = useAxios({
    url: '/Account/Register',
    method: 'POST',
  }, { manual: true })

  const [loginReq, login] = useAxios({
    url: '/Account/Login',
    method: 'POST',
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  const [googeReq, loginWithGoogle] = useAxios({
    url: '/Account/GoogleLogin',
    method: 'POST'
  }, { manual: true })

  const [FBloginReq, FBlogin] = useAxios({
    url: '/Account/FacebookLogin',
    method: 'POST',
  }, { manual: true })

  const [appleReq, loginWithApple] = useAxios({
    url: '/Account/AppleLogin',
    method: 'POST'
  }, { manual: true })

  const signupIsDisabled = () => loading || loginReq.loading || getUserReq.loading || googeReq.loading || FBloginReq.loading || socialLogin || appleReq.loading || !termWasAccepted

  useEffect(() => {
    GoogleSignin.configure(GlobalContants.GOOGLE_SIGNIN_DATA);
  }, [])

  const handleResponse = async () => {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });

      if (appleAuthRequestResponse.realUserStatus) {
        console.log(appleAuthRequestResponse)
        if (appleAuthRequestResponse.email) {
          await AsyncStorage.setItem("appleEmail", appleAuthRequestResponse.email)
        } else {
          const decodedData = JwtDecode(appleAuthRequestResponse.identityToken)
          appleAuthRequestResponse.email = decodedData.email
        }
        if (appleAuthRequestResponse.fullName && appleAuthRequestResponse.fullName.givenName) {
          await AsyncStorage.setItem("appleUserName", appleAuthRequestResponse.fullName.givenName)
        } else if (await AsyncStorage.getItem("appleUserName")) {
          appleAuthRequestResponse.fullName = { givenName: await AsyncStorage.getItem("appleUserName") }
        }
        const deviceToken = await AsyncStorage.getItem('AppleDeviceToken');

        loginWithApple({
          data: {
            "name": "",
            "email": appleAuthRequestResponse.email,
            "role": props.navigation.getParam('role'),
            deviceID: DeviceInfo.getUniqueId(),
            deviceType: Platform.OS,
            deviceToken,
            featured: props.navigation.getParam('isFeatured'),
          }
        })
          .then((r) => {
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOKEN, state: r.data })
            return getUserData()
          })
          .then((r) => {
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
            props.navigation.navigate(Screen.LandingPage)
          })
          .catch(err => console.log(err))
      }
    } catch (error) {
      if (error.code === AppleAuthError.CANCELED) {
      }
      if (error.code === AppleAuthError.FAILED) {
        Alert.alert('FAILED Touch ID wrong');
      }
      if (error.code === AppleAuthError.INVALID_RESPONSE) {
        Alert.alert('INVALID_RESPONSE Touch ID wrong');
      }
      if (error.code === AppleAuthError.NOT_HANDLED) {
      }
      if (error.code === AppleAuthError.UNKNOWN) {
        Alert.alert('UKNOWN Touch ID wrong');
      }
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.signup_layout}>
      <View style={styles.signup_container}>
        <View style={styles.signup_logo_view}>
          <Image source={Images.Logo} />
        </View>
        <NLUserDataForm {...props} onTermChanged={(accepted) => setTermWasAccepted(accepted)} screenToGoBackTo={Screen.SignUp} postcodeGooglePlaceselectedResult={props.navigation.getParam('postcodeGooglePlaceselectedResult')} postcodeGooglePlaces={props.navigation.getParam('postcodeGooglePlaces')} isFeatured={props.navigation.getParam('isFeatured', false)} showsConfirmPassword />
        <TouchableOpacity onPress={() => props.navigation.navigate("Login", { role: props.navigation.getParam('role', "Player"), isFeatured: props.navigation.getParam('isFeatured') })}>
          <View style={[styles.signup_other_view, { color: 'black', paddingTop: '5%', paddingBottom: '5%' }]}>
            <Text style={styles.signup_continue}>Go to Login</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.signup_other_view}>
          <View style={styles.signup_line}>
            <Text style={styles.signup_continue}>Or Continue with</Text>
          </View>
          <View style={styles.signup_other_social_view}>
            <TouchableOpacity
              disabled={signupIsDisabled()}
              onPress={() => {
                if (Platform.OS === "android") {
                  LoginManager.setLoginBehavior("web_only")
                }
                setSocialLogin(true)
                LoginManager.logInWithPermissions(["public_profile", "email"]).then((result) => {
                  if (result.isCancelled) throw new Error("Login cancelled")
                  return AccessToken.getCurrentAccessToken()
                })
                  .then(({ accessToken }) => RequestDeviceToken().then(deviceToken => ({ deviceToken, accessToken })))
                  .then(({ accessToken, deviceToken }) => FBlogin({ data: { featured: props.navigation.getParam('isFeatured'), deviceToken, deviceType: Platform.OS, deviceID: DeviceInfo.getUniqueId(), role: props.navigation.getParam('role'), authenticationToken: accessToken } }))
                  .then((r) => {
                    dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOKEN, state: r.data })
                    return getUserData()
                  })
                  .then((r) => {
                    askToBefeatured(r.data)
                    AsyncStorage.setItem('role', props.navigation.getParam('role'))
                    dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                    setSocialLogin(false)
                    props.navigation.navigate(Screen.LandingPage)
                  })
                  .catch(err => {
                    setSocialLogin(false)
                    console.log(err)
                  })
              }}
              style={[styles.fb_btn_view, { opacity: signupIsDisabled() ? 0.2 : 1, marginBottom: '5%' }]}
            >
              <Text style={styles.fb_title}>Facebook</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={async () => {
                setSocialLogin(true)
                try {
                  const deviceToken = await RequestDeviceToken()
                  console.log({ deviceToken })
                  await GoogleSignin.hasPlayServices();
                  const userInfo = await GoogleSignin.signIn();
                  console.log(userInfo)
                  loginWithGoogle({
                    data: {
                      "name": `${userInfo.user.givenName} ${userInfo.user.familyName}`,
                      "email": userInfo.user.email,
                      "picture": userInfo.user.photo,
                      "role": props.navigation.getParam('role'),
                      "authenticationToken": userInfo.serverAuthCode,
                      deviceId: DeviceInfo.getUniqueId(),
                      deviceType: Platform.OS,
                      deviceToken,
                      featured: props.navigation.getParam('isFeatured'),
                    }
                  })
                    .then((r) => {
                      dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOKEN, state: r.data })
                      return getUserData()
                    })
                    .then((r) => {
                      askToBefeatured(r.data)
                      AsyncStorage.setItem('role', props.navigation.getParam('role'))
                      dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                      setSocialLogin(false)
                      props.navigation.navigate(Screen.LandingPage)
                    })
                } catch (e) {
                  setSocialLogin(false)
                  console.log(e)
                }
              }}
              disabled={signupIsDisabled()}
              style={[styles.google_btn_view, { opacity: signupIsDisabled() ? 0.2 : 1, marginTop: '5%' }]}
            >
              <Text style={styles.google_title}>Google +</Text>
            </TouchableOpacity> */}
            {Platform.OS !== "android" && (
              <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                  width: '90%', // You must specify a width
                  height: 45, // You must specify a height
                }}
                onPress={() => handleResponse()}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Signup