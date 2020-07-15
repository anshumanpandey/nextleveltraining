import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import Images from '../../constants/image'
import styles from './styles.js';
import useAxios from 'axios-hooks'
import { Formik } from 'formik';
import ErrorLabel from '../../components/ErrorLabel';
import GlobalStyles from '../../constants/GlobalStyles';

const Login = () => {
  const [{ data, loading, error }, login] = useAxios({
    url: '/Account/Register',
    method: 'POST',
  })

  return (
    <ScrollView style={styles.login_layout}>
      <View style={styles.login_container}>
        <View style={styles.login_logo_view}>
          <Image source={Images.Mlogo} />
          <Text style={styles.login_logo_text}>Sign In</Text>
        </View>

        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {}

            if (!values.email) errors.email = 'Required'
            if (!values.password) errors.password = 'Required'

            return errors
          }}
          onSubmit={values => {
            login({ data: values})
            .then((r) => console.log(r.data))
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
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </View>
                {errors.email && touched.email && <ErrorLabel text={errors.email} />}
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
                  disabled={loading}
                  onPress={handleSubmit}
                  style={[styles.login_btn_player, loading && GlobalStyles.disabled_button]}
                >
                  <View style={styles.login_btn_player_view}>
                    <Text style={styles.login_player_text}>Join Now</Text>
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