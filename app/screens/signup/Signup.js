import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import Images from '../../constants/image'
import styles from './styles.js';
import useAxios from 'axios-hooks'
import { Formik } from 'formik';
import ErrorLabel from '../../components/ErrorLabel';
import Screen from '../../utils/screen';


const Signup = (props) => {
  const [{ data, loading, error }, register] = useAxios({
    url: '/Account/Register',
    method: 'POST',
  })

  return (
    <ScrollView style={styles.signup_layout}>
      <View style={styles.signup_container}>
        <View style={styles.signup_logo_view}>
          <Image source={Images.Mlogo} />
          <Text style={styles.signup_logo_text}>Sign Up as {props.navigation.getParam('role', "Player")}</Text>
        </View>

        <Formik
          initialValues={{
            fullName: "",
            address: "",
            emailID: "",
            mobileNo: "",
            password: "",
            role: props.navigation.getParam('role', "Player")
          }}
          validate={(values) => {
            const errors = {}

            if (!values.fullName) errors.fullName = 'Required'
            if (!values.address) errors.address = 'Required'
            if (!values.emailID) errors.emailID = 'Required'
            if (!values.mobileNo) errors.mobileNo = 'Required'
            if (!values.password) errors.password = 'Required'

            return errors
          }}
          onSubmit={values => {
            register({ data: values })
              .then((r) => {
                props.navigation.navigate(Screen.Login)
              })
              .catch((r) => console.log(r))
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View style={styles.signup_info_input_view}>
                <View style={styles.signup_info_view}>
                  <TextInput
                    placeholder="Full Name"
                    keyboardType="default"
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName}
                  />
                </View>
                {errors.fullName && touched.fullName && <ErrorLabel text={errors.fullName} />}

                <View style={styles.signup_info_view}>
                  <TextInput
                    placeholder="Address"
                    keyboardType="default"
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                  />
                </View>
                {errors.address && touched.address && <ErrorLabel text={errors.address} />}

                <View style={styles.signup_info_view}>
                  <TextInput
                    placeholder="Email ID"
                    keyboardType="email-address"
                    onChangeText={handleChange('emailID')}
                    onBlur={handleBlur('emailID')}
                    value={values.emailID}
                  />
                </View>
                {errors.emailID && touched.emailID && <ErrorLabel text={errors.emailID} />}

                <View style={styles.signup_info_view}>
                  <TextInput
                    placeholder="Mobile Number"
                    keyboardType='numeric'
                    onChangeText={handleChange('mobileNo')}
                    onBlur={handleBlur('mobileNo')}
                    value={values.mobileNo}
                  />
                </View>
                {errors.mobileNo && touched.mobileNo && <ErrorLabel text={errors.mobileNo} />}

                <View style={styles.signup_info_view}>
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
              <View style={styles.signup_btn_view}>
                <TouchableOpacity
                  style={styles.signup_btn_player}
                  onPress={handleSubmit}
                >
                  <View style={styles.signup_btn_player_view}>
                    <Text style={styles.signup_player_text}>Join Now</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>


        <View style={styles.signup_other_view}>
          <View style={styles.signup_line}>
            <Text style={styles.signup_continue}>Or Continue with</Text>
          </View>
          <View style={styles.signup_other_social_view}>
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

export default Signup