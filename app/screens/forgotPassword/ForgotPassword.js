import React, { Component, useEffect, useState } from 'react'
import { View, Text, Image, Alert, TouchableOpacity, ScrollView } from 'react-native'
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
import { Spinner, Input as TextInput } from 'native-base';
import Colors from '../../constants/color';

const ForgotPassword = (props) => {
  const [{ data, loading, error }, resetPassword] = useAxios({
    url: '/Account/ResetPassword',
    method: 'POST',
  }, { manual: true })

  const isLoginDisabled = () => {
    return loading
  }

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

            return errors
          }}
          onSubmit={values => {
            resetPassword({ data: values })
              .then((r) => {
                Alert.alert("A new password has been sent to this email")
                props.navigation.navigate("Login")
              })
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View style={styles.login_info_input_view}>
                <View style={styles.login_info_view}>
                  <TextInput
                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                    placeholder="Email ID"
                    keyboardType="email-address"
                    onChangeText={handleChange('emailID')}
                    onBlur={handleBlur('emailID')}
                    value={values.emailID}
                  />
                </View>
                {errors.emailID && touched.emailID && <ErrorLabel text={errors.emailID} />}


              </View>
              <View style={styles.login_btn_view}>
                <TouchableOpacity
                  disabled={isLoginDisabled()}
                  onPress={handleSubmit}
                  style={[styles.login_btn_player, isLoginDisabled() && GlobalStyles.disabled_button]}
                >
                  <View style={styles.login_btn_player_view}>
                    <Text style={styles.login_player_text}>Reset</Text>
                    {isLoginDisabled() && <Spinner color={Colors.s_yellow} />}
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>

      </View>
    </ScrollView>
  )
}

export default ForgotPassword;