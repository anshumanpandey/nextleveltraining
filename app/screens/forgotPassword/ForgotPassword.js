import React from 'react'
import { View, Text, Image, Alert, TouchableOpacity, ScrollView } from 'react-native'
import useAxios from 'axios-hooks'
import { Formik } from 'formik';
import { Spinner, Input as TextInput, Icon } from 'native-base';
import Images from '../../constants/image'
import styles from './styles';
import ErrorLabel from '../../components/ErrorLabel';
import GlobalStyles from '../../constants/GlobalStyles';
import Colors from '../../constants/color';
import Header from '../../components/header/Header'
import validations from '../../utils/validations'

const ForgotPassword = (props) => {
  const [{ loading }, resetPassword] = useAxios({
    url: '/Account/ResetPassword',
    method: 'POST',
  }, { manual: true })

  const isLoginDisabled = () => loading

  return (
    <ScrollView style={styles.login_layout}>
      <Header
        title="Forget Password"
        hideCreatePost
        customButton={() => (
          <Icon
            onPress={() => props.navigation.goBack()}
            type="Feather"
            name="arrow-left"
            style={{
              position: 'absolute',
              left: 15,
              fontSize: 22,
              zIndex: 1,
              color: '#2D7AF0',
            }}
          />
        )}
      />
      <View style={styles.login_container}>
        <View style={styles.login_logo_view}>
          <Image source={Images.Logo} />
          <Text style={styles.login_logo_text}>Reset Password</Text>
        </View>

        <Formik
          initialValues={{ emailID: '', password: '' }}
          validate={values => {
            const errors = {}

            const isValid = validations.isValidEmail(values.emailID)

            if (!values.emailID) {
              errors.emailID = 'Required'
            } else if (!isValid) {
              errors.emailID = 'Non valid email'
            }

            return errors
          }}
          onSubmit={values => {
            resetPassword({ data: values }).then(() => {
              Alert.alert('', 'A new password has been sent to this email')
              props.navigation.navigate('Login')
            })
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.login_info_input_view}>
                <View style={styles.login_info_view}>
                  <TextInput
                    style={{ color: 'black' }}
                    placeholderTextColor="rgba(0,0,0,0.3)"
                    placeholder="Email ID"
                    keyboardType="email-address"
                    onChangeText={handleChange('emailID')}
                    onBlur={handleBlur('emailID')}
                    value={values.emailID}
                  />
                </View>
                {errors.emailID && touched.emailID && (
                  <ErrorLabel text={errors.emailID} />
                )}
              </View>
              <View style={styles.login_btn_view}>
                <TouchableOpacity
                  disabled={isLoginDisabled()}
                  onPress={handleSubmit}
                  style={[
                    styles.login_btn_player,
                    isLoginDisabled() && GlobalStyles.disabled_button,
                  ]}>
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