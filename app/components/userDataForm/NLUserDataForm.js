import React, { Component } from 'react'
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

const NLUserDataForm = (props) => {
    const [{ data, loading, error }, register] = useAxios({
        url: '/Account/Register',
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

    return (
        <Formik
            initialValues={{
                fullName: props.navigation.getParam('FullName') || "",
                address: props.navigation.getParam('Address') || "",
                emailID: props.navigation.getParam('EmailID') || "",
                mobileNo: props.navigation.getParam('MobileNo') || "",
                password: "",
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
                        AsyncStorage.setItem('role', props.navigation.getParam('role', "Player"))
                        return login({ data: { emailID: values.emailID, password: values.password } })
                    })
                    .then((r) => {
                        dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOKEN, state: r.data })
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

                        <View style={[styles.signup_info_view, { borderBottomWidth: 0, zIndex: 20, height: 50 }]}>
                            <NLGooglePlacesAutocomplete
                                style={{ backgroundColor: 'transparent'}}
                                defaultValue={values.address}
                                onPress={(data, details) => {
                                setFieldValue("address", data.description)
                            }} />
                        </View>
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
                            disabled={signupIsDisabled()}
                            style={[styles.signup_btn_player, { width: 200 }, signupIsDisabled() && GlobalStyles.disabled_button]}
                            onPress={handleSubmit}
                        >
                            <View style={styles.signup_btn_player_view}>
                            <Text style={styles.signup_player_text}>{props.navigation.getParam('btnText', 'Join Now')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </Formik>
    );
}

export default NLUserDataForm;
