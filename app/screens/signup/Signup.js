import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableHighlight, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import Images from '../../constants/image'
import styles from './styles.js';
import useAxios from 'axios-hooks'
import Screen from '../../utils/screen';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin } from 'react-native-google-signin';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';
import NLUserDataForm from '../../components/userDataForm/NLUserDataForm';

const Signup = (props) => {
  const [socialLogin, setSocialLogin] = useState(false);

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

  const signupIsDisabled = () => loading || loginReq.loading || getUserReq.loading || googeReq.loading || FBloginReq.loading || socialLogin

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '682593494821-t85mnun0ho6flg4i2r657mfiiqoq77m7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: false, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '682593494821-0pkvvshud13mpk5q3l3bork71bsm4fed.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }, [])

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.signup_layout}>
      <View style={styles.signup_container}>
        <View style={styles.signup_logo_view}>
          <Image source={Images.Mlogo} />
        </View>
        <NLUserDataForm {...props} />
        <TouchableOpacity onPress={() => props.navigation.navigate("Login", { role: props.navigation.getParam('role', "Player") })}>
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
                  .then(({ accessToken }) => FBlogin({ data: { role: props.navigation.getParam('role', "Player"), authenticationToken: accessToken } }))
                  .then((r) => {
                    dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOKEN, state: r.data })
                    return getUserData()
                  })
                  .then((r) => {
                    AsyncStorage.setItem('role', props.navigation.getParam('role', "Player"))
                    dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                    setSocialLogin(false)
                    props.navigation.navigate(Screen.LandingPage)
                  })
                  .catch(err => {
                    setSocialLogin(false)
                    console.log(err)
                  })
              }}
              style={[styles.fb_btn_view, { opacity: signupIsDisabled() ? 0.2 : 1 }]}
            >
              <Text style={styles.fb_title}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                setSocialLogin(true)
                try {
                  await GoogleSignin.hasPlayServices();
                  const userInfo = await GoogleSignin.signIn();
                  console.log(userInfo)
                  loginWithGoogle({
                    data: {
                      "name": `${userInfo.user.givenName} ${userInfo.user.familyName}`,
                      "email": userInfo.user.email,
                      "picture": userInfo.user.photo,
                      "role": props.navigation.getParam('role', "Player"),
                      "authenticationToken": userInfo.serverAuthCode
                    }
                  })
                    .then((r) => {
                      dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOKEN, state: r.data })
                      return getUserData()
                    })
                    .then((r) => {
                      AsyncStorage.setItem('role', props.navigation.getParam('role', "Player"))
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
              style={[styles.google_btn_view, { opacity: signupIsDisabled() ? 0.2 : 1 }]}
            >
              <Text style={styles.google_title}>Google +</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Signup