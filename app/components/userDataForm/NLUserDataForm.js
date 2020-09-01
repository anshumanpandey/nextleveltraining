import React, { Component, useRef, useEffect } from 'react'
import { Text, TouchableOpacity, Platform } from 'react-native'
import NLGooglePlacesAutocomplete from '../NLGooglePlacesAutocomplete';
import GlobalStyles from '../../constants/GlobalStyles';
import { Formik } from 'formik';
import ErrorLabel from '../ErrorLabel';
import { View, Input as TextInput } from 'native-base';
import styles from './styles.js';
import useAxios from 'axios-hooks'
import AsyncStorage from '@react-native-community/async-storage';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';
import DeviceInfo from 'react-native-device-info';
import Screens from '../../utils/screen';
import InfoLabel from '../InfoLabel';
import messaging from '@react-native-firebase/messaging';
import { FIREBASE_SENDER_ID } from '../../utils/Firebase';
import { RequestDeviceToken } from '../../utils/firebase/RequestDeviceToken';

const NLUserDataForm = ({ action = "register", showsConfirmPassword = false,...props}) => {
    const formikRef = useRef()

    const [{ data, loading, error }, register] = useAxios({
        url: action == 'update' ? '/Users/UpdateProfile' : '/Account/Register',
        method: 'POST',
    }, { manual: true })

    const [loginReq, login] = useAxios({
        url: '/Account/Login',
        method: 'POST',
    }, { manual: true })

    const [getUserReq, getUserData] = useAxios({
        url: '/Users/GetUser',
    }, { manual: true })

    const signupIsDisabled = () => loading || loginReq.loading || getUserReq.loading

    useEffect(() => {
        props.setSubmitFn && props.setSubmitFn(formikRef.current?.submitForm)
    }, [])

    return (
        <Formik
            innerRef={(r) => formikRef.current = r}
            initialValues={{
                fullName: props.navigation.getParam('FullName') || "",
                address: props.navigation.getParam('Address') || "",
                emailID: props.navigation.getParam('EmailID') || "",
                mobileNo: props.navigation.getParam('MobileNo') || "",
                postCode: props.navigation.getParam('PostCode') || "",
                role: props.navigation.getParam('role', "Player"),
                password: "",
                confirmPassword: "",
                lat: props.navigation.getParam('Lat'),
                lng: props.navigation.getParam('Lng'),
            }}
            validate={(values) => {
                const errors = {}

                if (!values.fullName) errors.fullName = 'Required'
                if (!values.address) errors.address = 'Required'
                if (!values.emailID) errors.emailID = 'Required'
                if (!values.mobileNo) errors.mobileNo = 'Required'
                if (!values.postCode) errors.postCode = 'Required'

                if (props.hidePasswordInput != true) {
                    if (!values.password) {
                        errors.password = 'Required'
                      } else if (values.password.length < 8) {
                        errors.password = 'Must be at least 8 characters long'
                      } else if (/\d/.test(values.password) == false) {
                        errors.password = 'Must include one number'
                      } else if (/[A-Z]/.test(values.password) == false) {
                        errors.password = 'Must include one uppercase character'
                      } else if (/[~`!#$%@\^&*+=\-\[\]\\';,/{}|\\":<>\?\.!]/g.test(values.password) == false) {
                        errors.password = 'Must include one special character'
                      }
                }

                if (showsConfirmPassword) {
                    if (!values.confirmPassword) {
                        errors.confirmPassword = 'Required'
                    } else if(props.hidePasswordInput != true && values.password) {
                        if (values.password != values.confirmPassword) {
                            errors.confirmPassword = 'Password and Confirm Password does not match'
                        }
                    }
                }

                return errors
            }}
            onSubmit={async values => {
                const deviceToken = await RequestDeviceToken()

                console.log('saving user data')
                if (props.hidePasswordInput == true) {
                    delete values.password
                }
                values.deviceId = DeviceInfo.getUniqueId()
                values.deviceType = Platform.OS
                values.deviceToken = deviceToken
                return register({ data: values })
                    .then((r) => {
                        if (action == 'register') {
                            AsyncStorage.setItem('role', props.navigation.getParam('role', "Player"))
                            return login({ data: { emailID: values.emailID, password: values.password } })
                        }
                        return Promise.resolve()
                    })
                    .then((r) => {
                        if (action == 'register') {
                            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOKEN, state: r.data })
                        }
                        return getUserData()
                    })
                    .then((r) => {
                        dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                        props.navigation.navigate(Screens.LandingPage)
                    })
                    .catch((r) => console.log(r))
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                <>
                    <View style={styles.signup_info_input_view}>
                        <View style={styles.signup_info_view}>
                            <TextInput
                                style={{ color: "black"}}
                                placeholderTextColor={'rgba(0,0,0,0.3)'}
                                placeholder="Full Name"
                                keyboardType="default"
                                onChangeText={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                            />
                        </View>
                        {errors.fullName && touched.fullName && <ErrorLabel text={errors.fullName} />}

                        <NLGooglePlacesAutocomplete
                            hideMap={true}
                            placeholder={"Home Address"}
                            style={{ backgroundColor: 'transparent' }}
                            defaultValue={values.address}
                            onPress={(data, details) => {
                                setFieldValue("address", data.description)
                                setFieldValue("lat", details.geometry.location.lat)
                                setFieldValue("lng", details.geometry.location.lng)
                            }} />
                        {errors.address && touched.address && <ErrorLabel text={errors.address} />}

                        <View style={styles.signup_info_view}>
                            <TextInput
                                style={{ color: "black"}}
                                placeholderTextColor={'rgba(0,0,0,0.3)'}
                                placeholder="Home Postcode"
                                onChangeText={handleChange('postCode')}
                                onBlur={handleBlur('postCode')}
                                value={values.postCode}
                            />
                        </View>
                        {errors.postCode && touched.postCode && <ErrorLabel text={errors.postCode} />}

                        <View style={styles.signup_info_view}>
                            <TextInput
                                style={{ color: "black"}}
                                placeholderTextColor={'rgba(0,0,0,0.3)'}
                                editable={!props.navigation.getParam('emailIDIsDisabled', false)}
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
                                style={{ color: "black"}}
                                placeholderTextColor={'rgba(0,0,0,0.3)'}
                                placeholder="Mobile Number"
                                keyboardType='numeric'
                                onChangeText={handleChange('mobileNo')}
                                onBlur={handleBlur('mobileNo')}
                                value={values.mobileNo}
                            />
                        </View>
                        {errors.mobileNo && touched.mobileNo && <ErrorLabel text={errors.mobileNo} />}

                        {props.hidePasswordInput != true && (
                            <>
                                <View style={styles.signup_info_view}>
                                    <TextInput
                                        style={{ color: "black"}}
                                        placeholderTextColor={'rgba(0,0,0,0.3)'}
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                </View>
                                {errors.password && touched.password && <ErrorLabel text={errors.password} />}
                            </>
                        )}
                        {showsConfirmPassword == true && (
                            <>
                                <View style={styles.signup_info_view}>
                                    <TextInput
                                        style={{ color: "black"}}
                                        placeholderTextColor={'rgba(0,0,0,0.3)'}
                                        placeholder="Confirm Password"
                                        secureTextEntry={true}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                    />
                                </View>
                                <InfoLabel style={{ width: '85%' }} text={"Password should contain at least 1 number, 1 alphabet in caps and 1 special character."} />
                                {errors.confirmPassword && touched.confirmPassword && <ErrorLabel text={errors.confirmPassword} />}
                            </>
                        )}

                    </View>
                    {props.hideSaveBtn != true && (
                        <View style={styles.signup_btn_view}>
                            <TouchableOpacity
                                disabled={signupIsDisabled()}
                                style={[styles.signup_btn_player, { width: 200 }, signupIsDisabled() && GlobalStyles.disabled_button]}
                                onPress={handleSubmit}
                            >
                                <View style={styles.signup_btn_player_view}>
                                    <Text style={styles.signup_player_text}>{props.navigation.getParam('btnText', 'Join Now')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}
        </Formik>
    );
}

export default NLUserDataForm;
