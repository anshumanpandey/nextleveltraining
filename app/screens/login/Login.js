import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import Images from '../../constants/image'
import styles from './styles.js';
import useAxios from 'axios-hooks'
import { Formik } from 'formik';
import ErrorLabel from '../../components/ErrorLabel';
import GlobalStyles from '../../constants/GlobalStyles';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';
import Screen from '../../utils/screen';

const Login = (props) => {
  const [{ data, loading, error }, login] = useAxios({
    url: '/Account/Login',
    method: 'POST',
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

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
            login({ data: values})
            .then((r) => {
              dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOKEN, state: r.data})
              return getUserData()
            })
            .then((r) => {
              dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data})
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
                  disabled={loading || getUserReq.loading}
                  onPress={handleSubmit}
                  style={[styles.login_btn_player, loading && GlobalStyles.disabled_button]}
                >
                  <View style={styles.login_btn_player_view}>
                    <Text style={styles.login_player_text}>Login</Text>
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
              style={styles.fb_btn_view}
            >
              <Text style={styles.fb_title}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.google_btn_view}
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