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
import NavigationService from '../../navigation/NavigationService';

const ForceChangePassword = (props) => {
  const [{ data, loading, error }, resetPassword] = useAxios({
    url: '/Account/ResetPassword',
    method: 'POST',
  }, { manual: true })

  const [changePasswordReq, changePassword] = useAxios({
    url: '/Users/ChangePassword',
    method: 'POST',
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  const isLoginDisabled = () => {
    return loading
  }

  return (
    <ScrollView style={styles.login_layout}>
      <View style={styles.login_container}>
        <View style={styles.login_logo_view}>
          <Image source={Images.Mlogo} />
          <Text style={styles.login_logo_text}>Change Password</Text>
        </View>

        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
            newPassword: "",
          }}
          validate={(values) => {
            const errors = {}

            if (!values.password) errors.password = 'Required'

            if (!values.newPassword) {
              errors.newPassword = 'Required'
            } else if (values.newPassword.length < 8) {
              errors.newPassword = 'Must be at least 8 characters long'
            } else if (/\d/.test(values.newPassword) == false) {
              errors.newPassword = 'Must include one number'
            } else if (/[A-Z]/.test(values.newPassword) == false) {
              errors.newPassword = 'Must include one number'
            } else if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(values.newPassword) == false) {
              errors.newPassword = 'Must include one special character'
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = 'Required'
            } else if (values.newPassword != values.confirmPassword) {
              errors.confirmPassword = 'Password does not match'
            }

            return errors
          }}
          onSubmit={values => {
            const data = {
              "oldPassword": values.password,
              "newPassword": values.newPassword
            }
            return changePassword({ data })
              .then(() => {
                Alert.alert("", "Your password has been changed")
                return getUserData()
              })
              .then((r) => {
                dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data})
                dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOGGLE })
                NavigationService.navigate("Home")
              })
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View style={styles.login_info_input_view}>
                <View style={styles.login_info_view}>
                  <TextInput
                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                    placeholder="Current Passsword"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                </View>
                {errors.password && touched.password && <ErrorLabel text={errors.password} />}

                <View style={styles.login_info_view}>
                  <TextInput
                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                    placeholder="New Passsword"
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    value={values.newPassword}
                  />
                </View>
                {errors.newPassword && touched.newPassword && <ErrorLabel text={errors.newPassword} />}

                <View style={styles.login_info_view}>
                  <TextInput
                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                    placeholder="Confirm Passsword"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                  />
                </View>
                {errors.confirmPassword && touched.confirmPassword && <ErrorLabel text={errors.confirmPassword} />}

              </View>
              <View style={styles.login_btn_view}>
                <TouchableOpacity
                  disabled={isLoginDisabled()}
                  onPress={handleSubmit}
                  style={[styles.login_btn_player, isLoginDisabled() && GlobalStyles.disabled_button]}
                >
                  <View style={styles.login_btn_player_view}>
                    <Text style={styles.login_player_text}>Change</Text>
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

export default ForceChangePassword;