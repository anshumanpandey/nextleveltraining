import React, { Component, useEffect, useState } from 'react'
import { View, Text, Image, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import Images from '../../constants/image'
import styles from './styles.js';
import useAxios from 'axios-hooks'
import { Formik } from 'formik';
import ErrorLabel from '../../components/ErrorLabel';
import GlobalStyles from '../../constants/GlobalStyles';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';
import Screen from '../../utils/screen';
import AsyncStorage from '@react-native-community/async-storage';
import { Spinner } from 'native-base';
import Colors from '../../constants/color';

const Login = (props) => {
  const [role, setRole] = useState();
  const [{ data, loading, error }, login] = useAxios({
    url: '/Account/Login',
    method: 'POST',
  }, { manual: true })

  const [FBloginReq, FBlogin] = useAxios({
    url: '/Account/FacebookLogin',
    method: 'POST',
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  const isLoginDisabled = () => {
    return loading || FBloginReq.loading || getUserReq.loading
  }

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '682593494821-mfc7dg2076o471fsq0v8sktjrqv6g8pn.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: false, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '634112134799-ron6nkiu8tf6vrg1hiuojnuls9l8ddp1.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    AsyncStorage.getItem('role')
    .then((r) => {
      if (!r) return 
      setRole(r)
    })
  }, [])

  return (
    <ScrollView style={styles.login_layout}>
      <View style={styles.login_container}>
        <View style={styles.login_logo_view}>
          <Image source={Images.Mlogo} />
          <Text style={styles.login_logo_text}>Sign In</Text>
        </View>

        <Formik
          initialValues={{ emailID: '', password: '' }}
          validate={(values) => {
            const errors = {}

            if (!values.emailID) errors.emailID = 'Required'
            if (!values.password) errors.password = 'Required'

            return errors
          }}
          onSubmit={values => {
            login({ data: values })
              .then((r) => {
                dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOKEN, state: r.data })
                return getUserData()
              })
              .then((r) => {
                dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                props.navigation.navigate(Screen.LandingPage)
              })
              .catch((r) => console.log(r))
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View style={styles.login_info_input_view}>
                <View style={styles.login_info_view}>
                  <TextInput
                    placeholder="Email ID"
                    keyboardType="email-address"
                    onChangeText={handleChange('emailID')}
                    onBlur={handleBlur('emailID')}
                    value={values.emailID}
                  />
                </View>
                {errors.emailID && touched.emailID && <ErrorLabel text={errors.emailID} />}
                <View style={styles.login_info_view}>
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                </View>
                {errors.password && touched.password && <ErrorLabel text={errors.password} />}

              </View>
              <View style={styles.login_forgot_view}>
                <Text style={styles.login_forgot_title}>Forgot Password?</Text>
              </View>
              <View style={styles.login_btn_view}>
                <TouchableOpacity
                  disabled={isLoginDisabled()}
                  onPress={handleSubmit}
                  style={[styles.login_btn_player, isLoginDisabled() && GlobalStyles.disabled_button]}
                >
                  <View style={styles.login_btn_player_view}>
                    <Text style={styles.login_player_text}>Login</Text>
                    {isLoginDisabled() && <Spinner color={Colors.s_yellow} />}
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>

        <View style={styles.login_other_view}>
          <View style={styles.login_line}>
            <Text style={styles.login_continue}>Or Continue with</Text>
          </View>
          <View style={styles.login_other_social_view}>
            <TouchableOpacity
              disabled={isLoginDisabled()}
              onPress={() => {
                if (!role) return
                console.log(role)
                if (Platform.OS === "android") {
                  LoginManager.setLoginBehavior("web_only")
                }
                LoginManager.logInWithPermissions(["public_profile", "email"]).then((result) => {
                    if (result.isCancelled) throw new Error("Login cancelled")                     
                    return AccessToken.getCurrentAccessToken()
                })
                .then(({ accessToken }) => FBlogin({data: { role , authenticationToken: accessToken }}))
                .then((r) => {
                  dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOKEN, state: r.data })
                  return getUserData()
                })
                .then((r) => {
                  dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                  props.navigation.navigate(Screen.LandingPage)
                })
                .catch(err => console.log(err))
              }}
              style={[styles.fb_btn_view, { opacity: isLoginDisabled() ? 0.2 : 1}]}
            >
              <Text style={styles.fb_title}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isLoginDisabled()}
              onPress={async () => {
                try {
                  await GoogleSignin.hasPlayServices();
                  const userInfo = await GoogleSignin.signIn();
                  console.log(userInfo)
                } catch (e) {
                  console.log(e)
                }
              }}
              style={[styles.google_btn_view, { opacity: isLoginDisabled() ? 0.2 : 1}]}
            >
              <Text style={styles.google_title}>Google +</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Login;