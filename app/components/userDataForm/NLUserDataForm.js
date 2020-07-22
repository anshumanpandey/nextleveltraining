import React, { Component, useRef, useEffect } from 'react'
import { Text } from 'react-native'
import NLGooglePlacesAutocomplete from '../NLGooglePlacesAutocomplete';
import GlobalStyles from '../../constants/GlobalStyles';
import { Formik } from 'formik';
import ErrorLabel from '../ErrorLabel';
import { View } from 'native-base';
import styles from './styles.js';
import useAxios from 'axios-hooks'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';
import Screens from '../../utils/screen';

const NLUserDataForm = ({ action = "register",...props}) => {
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
                role: props.navigation.getParam('role', "Player"),
                password: "",
                lat: 0,
                lng: 0
            }}
            validate={(values) => {
                const errors = {}

                if (!values.fullName) errors.fullName = 'Required'
                if (!values.address) errors.address = 'Required'
                if (!values.emailID) errors.emailID = 'Required'
                if (!values.mobileNo) errors.mobileNo = 'Required'

                if (props.hidePasswordInput != true) {
                    if (!values.password) errors.password = 'Required'
                }

                console.log('validation done')


                return errors
            }}
            onSubmit={values => {
                console.log('saving user data')
                if (props.hidePasswordInput == true) {
                    delete values.password
                }
                register({ data: values })
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
