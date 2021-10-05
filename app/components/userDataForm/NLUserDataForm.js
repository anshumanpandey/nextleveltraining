import React, { useRef, useEffect } from 'react'
import { Text, TouchableOpacity, Platform } from 'react-native'
import { Formik } from 'formik'
import { View, Input as TextInput, Spinner } from 'native-base'
import useAxios from 'axios-hooks'
import AsyncStorage from '@react-native-community/async-storage'
import DeviceInfo from 'react-native-device-info'
import GlobalStyles from '../../constants/GlobalStyles'
import ErrorLabel from '../ErrorLabel'
import styles from './styles'
import validations from '../../utils/validations'
import {
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
} from '../../state/GlobalState'
import InfoLabel from '../InfoLabel'
import { RequestDeviceToken } from '../../utils/firebase/RequestDeviceToken'
import NLAddressSuggestionInput from '../postcodeInput/NLAddressSuggestionInput'
import { usePostCodeSearch } from '../postcodeInput/state';
import Colors from '../../constants/color';

const NLUserDataForm = ({
  action = 'register',
  showsConfirmPassword = false,
  screenToGoBackTo,
  setSubmitFn,
  navigation,
  ...props
}) => {
  const formikRef = useRef()
  const postCodeSearch = usePostCodeSearch()

  const [{ loading }, register] = useAxios({
    url: action == 'update' ? '/Users/UpdateProfile' : '/Account/Register',
    method: 'POST',
  },
    { manual: true })

  const [loginReq, login] = useAxios({
    url: '/Account/Login',
    method: 'POST',
  },
    { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  },
    { manual: true })

  const signupIsDisabled = () =>
    loading || loginReq.loading || getUserReq.loading || postCodeSearch.isSearching

  useEffect(() => {
    const focusListener = navigation.addListener('didBlur', () => formikRef.current?.setFieldValue("postCode", ""));
    return () => {
      focusListener?.remove();
    }
  }, [navigation])

  useEffect(() => {
    if (setSubmitFn) {
      setSubmitFn(formikRef.current?.submitForm)
    }
  }, [setSubmitFn])

  return (
    <Formik
      innerRef={r => { formikRef.current = r }}
      initialValues={{
        fullName: navigation.getParam('FullName') || '',
        emailId: navigation.getParam('EmailID') || '',
        username: navigation.getParam('Username') || '',
        address: navigation.getParam('Address') || '',
        mobileNo: navigation.getParam('MobileNo') || '',
        postCode: navigation.getParam('PostCode') || '',
        state: navigation.getParam('state') || '',
        role: navigation.getParam('role', 'Player'),
        password: '',
        confirmPassword: '',
        lat: navigation.getParam('Lat'),
        lng: navigation.getParam('Lng'),
      }}
      validate={values => {
        const errors = {}

        if (!values.fullName) errors.fullName = 'Required'
        if (!values.address) errors.address = 'Required'
        if (!values.mobileNo) errors.mobileNo = 'Required'
        if (!values.emailId) {
          errors.emailId = 'Required'
        } else if (!validations.isValidEmail(values.emailId)) {
          errors.emailId = 'Non valid Email'
        }
        if (!values.postCode) errors.postCode = 'Required'
        if (!values.state) errors.state = 'Required'

        if (props.hidePasswordInput != true) {
          if (!values.password) {
            errors.password = 'Required'
          } else if (values.password.length < 8) {
            errors.password = 'Must be at least 8 characters long'
          } else if (/\d/.test(values.password) == false) {
            errors.password = 'Must include one number'
          } else if (/[A-Z]/.test(values.password) == false) {
            errors.password = 'Must include one uppercase character'
          } else if (
            /[~`!#$%@\^&*+=\-\[\]\\';,/{}|\\":<>\?\.!]/g.test(
              values.password,
            ) == false
          ) {
            errors.password = 'Must include one special character'
          }
        }

        if (showsConfirmPassword) {
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required'
          } else if (props.hidePasswordInput != true && values.password) {
            if (values.password != values.confirmPassword) {
              errors.confirmPassword =
                'Password and Confirm Password does not match'
            }
          }
        }

        return errors
      }}
      onSubmit={async v => {
        const values = { ...v }
        const deviceToken = await RequestDeviceToken()

        if (props.hidePasswordInput == true) {
          delete values.password
        }
        values.deviceId = DeviceInfo.getUniqueId()
        values.deviceType = Platform.OS
        values.deviceToken = deviceToken
        return register({ data: values })
          .then(() => AsyncStorage.setItem("justRegistered", "1"))
          .then(() => {
            if (action == 'register') {
              AsyncStorage.setItem(
                'role',
                navigation.getParam('role', 'Player'),
              )
              return login({
                data: { emailId: values.emailId, password: values.password },
              })
            }
            return Promise.resolve()
          })
          .then(r => {
            if (action == 'register') {
              dispatchGlobalState({
                type: GLOBAL_STATE_ACTIONS.TOKEN,
                state: r.data,
              })
            }
            return getUserData()
          })
          .then(r => {
            dispatchGlobalState({
              type: GLOBAL_STATE_ACTIONS.PROFILE,
              state: r.data,
            })
            postCodeSearch.clearState()
          })
          .catch(r => console.log(r))
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <>
          <View style={styles.signup_info_input_view}>
            <View style={styles.signup_info_view}>
              <TextInput
                style={{ color: 'black' }}
                placeholderTextColor="rgba(0,0,0,0.3)"
                placeholder="Full Name"
                keyboardType="default"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
              />
            </View>
            {errors.fullName && touched.fullName && (
              <ErrorLabel text={errors.fullName} />
            )}

            <NLAddressSuggestionInput
              style={{ width: '85%' }}
              placeholder="Address"
              defaultValue={values.address}
              onLocationSelected={(location) => {
                postCodeSearch.getSiteDetails(location)
                  .then(details => {
                    setFieldValue('address', details.getAddress())
                    const coordinates = details.getPlaceLatLong()
                    setFieldValue('lat', coordinates.lat)
                    setFieldValue('lng', coordinates.lng)
                    setFieldValue('postCode', details.getPlacePostCode())
                    setFieldValue('state', `${details.getPlaceDistrict()} ${details.getPlaceCounty()}, ${details.getPlaceCountry()}`.trim())
                  })
              }}

            />

            <View style={styles.signup_info_view}>
              <TextInput
                style={{ color: 'black' }}
                placeholderTextColor="rgba(0,0,0,0.3)"
                autoCapitalize={false}
                placeholder="Email"
                onChangeText={handleChange('emailId')}
                onBlur={handleBlur('emailId')}
                value={values.emailId}
              />
            </View>
            {errors.emailId && touched.emailId && (
              <ErrorLabel text={errors.emailId} />
            )}

            <View style={styles.signup_info_view}>
              <TextInput
                style={{ color: 'black' }}
                placeholderTextColor="rgba(0,0,0,0.3)"
                autoCapitalize={false}
                placeholder="Username"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
            </View>
            {errors.username && touched.username && (
              <ErrorLabel text={errors.username} />
            )}

            <View style={styles.signup_info_view}>
              <TextInput
                style={{ color: 'black' }}
                placeholderTextColor="rgba(0,0,0,0.3)"
                placeholder="Mobile Number"
                keyboardType="numeric"
                onChangeText={handleChange('mobileNo')}
                onBlur={handleBlur('mobileNo')}
                value={values.mobileNo}
              />
            </View>
            {errors.mobileNo && touched.mobileNo && (
              <ErrorLabel text={errors.mobileNo} />
            )}

            {props.hidePasswordInput != true && (
              <>
                <View style={styles.signup_info_view}>
                  <TextInput
                    style={{ color: 'black' }}
                    placeholderTextColor="rgba(0,0,0,0.3)"
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                </View>
                {errors.password && touched.password && (
                  <ErrorLabel text={errors.password} />
                )}
              </>
            )}
            {showsConfirmPassword === true && (
              <>
                <View style={styles.signup_info_view}>
                  <TextInput
                    style={{ color: 'black' }}
                    placeholderTextColor="rgba(0,0,0,0.3)"
                    placeholder="Confirm Password"
                    secureTextEntry
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                  />
                </View>
                <InfoLabel
                  style={{ width: '85%' }}
                  text="Password should contain at least 1 number, 1 alphabet in caps and 1 special character."
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <ErrorLabel text={errors.confirmPassword} />
                )}
              </>
            )}
          </View>
          {props.hideSaveBtn != true && (
            <View style={styles.signup_btn_view}>
              <TouchableOpacity
                disabled={signupIsDisabled()}
                style={[
                  styles.signup_btn_player,
                  { width: 200 },
                  signupIsDisabled() && GlobalStyles.disabled_button,
                ]}
                onPress={handleSubmit}>
                <View style={styles.signup_btn_player_view}>
                  <Text style={styles.signup_player_text}>
                    {navigation.getParam('btnText', 'Join Now')}
                  </Text>
                  {signupIsDisabled() === true && <Spinner color={Colors.s_yellow} />}
                </View>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </Formik>
  )
}

export default NLUserDataForm
