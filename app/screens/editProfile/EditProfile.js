import React, { useState, useRef } from 'react'
import { View, Text, Alert } from 'react-native'
import Header from '../../components/header/Header'
import NLUserDataForm from '../../components/userDataForm/NLUserDataForm'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { Spinner, Tabs, Tab } from 'native-base'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Formik } from 'formik';
import useAxios from 'axios-hooks'
import { Input as TextInput } from 'native-base';
import styles from './styles.js';
import ErrorLabel from '../../components/ErrorLabel'
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState'

const EditProfile = (props) => {
    const [isSaving, setIsSaving] = useState(false);
    const [submitDetailsFn, setDetailsSubmitFn] = useState();
    const [currentSubmitFn, setCurrentSubmitFn] = useState();
    const paswordFormikRef = useRef()

    const [changePasswordReq, changePassword] = useAxios({
        url: '/Users/ChangePassword',
        method: 'POST',
    }, { manual: true })

    return (
        <ScrollView keyboardShouldPersistTaps="handled" style={{
            width: "100%",
            height: "100%",
            backgroundColor: 'white'
        }}>
            <View style={{
                backgroundColor: 'white',
                height: "100%",
                width: "100%"
            }}>
                <Header
                    title="Personal Details"
                    hideCreatePost={true}
                    toggleDrawer={props.navigation.toggleDrawer}
                    navigate={props.navigation.navigate}
                    customButton={() => {
                        return (
                            <View style={{ flexDirection: 'row', width: '70%', justifyContent: 'flex-end', alignItems: 'center', flexGrow: 1 }}>
                                {isSaving && <Spinner size={28} color="black" style={{ right: 20, position: 'absolute', marginRight: '10%', height: '10%' }} />}
                                <TouchableOpacity
                                    disabled={isSaving == true}
                                    onPress={() => {
                                        if (currentSubmitFn) {
                                            setIsSaving(true)
                                            currentSubmitFn()
                                                .then(() => setIsSaving(false))
                                        }
                                    }}>
                                    <Text style={{ color: 'black', opacity: isSaving == true ? 0.5 : 1, fontSize: 18 }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
                <Tabs onChangeTab={(e) => {
                    console.log(e.i)
                    if (e.i == 0) {
                        setCurrentSubmitFn(() => submitDetailsFn)
                    }
                    if (e.i == 1) {
                        setCurrentSubmitFn(() => paswordFormikRef.current.submitForm)
                    }
                }} tabBarUnderlineStyle={{ backgroundColor: Colors.s_blue }}>
                    <Tab activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Personal details">
                        <NLUserDataForm
                            {...props}
                            hidePasswordInput={true}
                            hideSaveBtn={true}
                            action="update"
                            setSubmitFn={(submitFn) => {
                                setDetailsSubmitFn(() => submitFn)
                                setCurrentSubmitFn(() => submitFn)
                            }}
                        />
                    </Tab>
                    <Tab activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Change Password">
                        <Formik
                            innerRef={(r) => paswordFormikRef.current = r}
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
                                } else if (/[~`!#$%@\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(values.newPassword) == false) {
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
                                        dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.LOGOUT })
                                    })
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => {
                                return (
                                    <View style={{ padding: '5%' }}>
                                        <View style={styles.signup_info_view}>
                                            <View style={styles.signup_info_view}>
                                                <TextInput
                                                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                                                    placeholder="Password"
                                                    secureTextEntry={true}
                                                    onChangeText={handleChange('password')}
                                                    onBlur={handleBlur('password')}
                                                    value={values.password}
                                                />
                                            </View>
                                            {errors.password && touched.password && <ErrorLabel text={errors.password} />}
                                            <TextInput
                                                placeholderTextColor={'rgba(0,0,0,0.3)'}
                                                placeholder="New Password"
                                                secureTextEntry={true}
                                                onChangeText={handleChange('newPassword')}
                                                onBlur={handleBlur('newPassword')}
                                                value={values.newPassword}
                                            />
                                        </View>
                                        {errors.newPassword && touched.newPassword && <ErrorLabel text={errors.newPassword} />}
                                        <View style={styles.signup_info_view}>
                                            <TextInput
                                                placeholderTextColor={'rgba(0,0,0,0.3)'}
                                                placeholder="Confirm Password"
                                                secureTextEntry={true}
                                                onChangeText={handleChange('confirmPassword')}
                                                onBlur={handleBlur('confirmPassword')}
                                                value={values.confirmPassword}
                                            />
                                        </View>
                                        {errors.confirmPassword && touched.confirmPassword && <ErrorLabel text={errors.confirmPassword} />}
                                    </View>
                                );
                            }}
                        </Formik>

                    </Tab>
                </Tabs>
            </View>
        </ScrollView>
    )
}

export default EditProfile
