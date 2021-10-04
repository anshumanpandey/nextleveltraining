import React, { useState, useRef, useCallback, useEffect } from 'react'
import { View, Text, Alert } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { Spinner, Tabs, Tab, Icon, Input as TextInput } from 'native-base'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Formik } from 'formik'
import useAxios from 'axios-hooks'
import Header from '../../components/header/Header'
import styles from './styles.js'
import ErrorLabel from '../../components/ErrorLabel'
import {
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
  useGlobalState,
} from '../../state/GlobalState'
import InfoLabel from '../../components/InfoLabel'
import PersonalDetailsEdit from './PersonalDetailsEdit'

const PersonalDetails = props => {
  const [currentTab, setCurrentTab] = useState(0)
  const [isReadyToSave, setIsReadyToSave] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [submitDetailsFn, setDetailsSubmitFn] = useState()
  const [currentSubmitFn, setCurrentSubmitFn] = useState()
  const [edit, setEdit] = React.useState(false)
  const paswordFormikRef = useRef()
  const [profile] = useGlobalState('profile')

  const [, changePassword] = useAxios(
    {
      url: '/Users/ChangePassword',
      method: 'POST',
    },
    { manual: true },
  )

  useEffect(() => {
    onBlur()
  }, [])

  const onBlur = () => {
    const isDisabled = saveBtnIsDisabled()
    console.log({ isDisabled })
    setIsReadyToSave(!isDisabled)
  }

  const saveBtnIsDisabled = () => (
    paswordFormikRef.current === undefined ||
    Object.keys(paswordFormikRef.current?.errors || {}).length !== 0 ||
    isSaving === true
  )

  const customeHeader = () => {
    if (currentTab === 0) return <></>
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '70%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexGrow: 1,
        }}>
        {isSaving && (
          <Spinner
            size={28}
            color="black"
            style={{
              right: 20,
              position: 'absolute',
              marginRight: '10%',
              height: '10%',
            }}
          />
        )}
        <Icon
          onPress={() => props.navigation.goBack()}
          type="Feather"
          name="arrow-left"
          style={{
            left: 15,
            fontSize: 22,
            color: '#2D7AF0',
          }}
        />
        <TouchableOpacity
          disabled={isReadyToSave === false}
          onPress={() => {
            if (currentSubmitFn) {
              setIsSaving(true)
              currentSubmitFn().then(() => setIsSaving(false))
            }
          }}>
          <Text
            style={{
              color: 'black',
              opacity: isReadyToSave === false ? 0.5 : 1,
              fontSize: 18,
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
        }}>
        <Header
          title="Personal Details"
          hideCreatePost
          toggleDrawer={props.navigation.toggleDrawer}
          navigate={props.navigation.navigate}
          customButton={customeHeader}
        />
        <Tabs
          onChangeTab={e => {
            setCurrentTab(e.i)
            if (e.i === 0) {
              setCurrentSubmitFn(() => submitDetailsFn)
            }
            if (e.i === 1) {
              setCurrentSubmitFn(() => paswordFormikRef.current.submitForm)
            }
          }}
          tabBarUnderlineStyle={{ backgroundColor: Colors.s_blue }}>
          <Tab
            activeTextStyle={{ color: Colors.s_blue }}
            tabStyle={{ backgroundColor: 'white' }}
            activeTabStyle={{ backgroundColor: 'white' }}
            heading="Personal details">
            {edit ? (
              <PersonalDetailsEdit
                FullName={profile.FullName}
                Address={profile.Address}
                MobileNo={profile.MobileNo}
                postCode={profile.PostCode}
                state={profile.State}
                cancelEdit={() => setEdit(false)}
              />
            ) : (
              <>
                <View style={styles.personal_detail_view}>
                  <Text style={styles.personal_detail_label}>Full Name:</Text>
                  <Text style={styles.personal_detail_text}>
                    {profile.FullName}
                  </Text>
                </View>
                <View style={styles.personal_detail_view}>
                  <Text style={styles.personal_detail_label}>Post Code:</Text>
                  <Text style={styles.personal_detail_text}>
                    {profile.PostCode}
                  </Text>
                </View>
                <View style={styles.personal_detail_view}>
                  <Text style={styles.personal_detail_label}>Address:</Text>
                  <Text style={styles.personal_detail_text}>
                    {profile.Address}
                  </Text>
                </View>
                <View style={styles.personal_detail_view}>
                  <Text style={styles.personal_detail_label}>Email:</Text>
                  <Text style={styles.personal_detail_text}>
                    {profile.EmailID}
                  </Text>
                </View>
                <View style={styles.personal_detail_view}>
                  <Text style={styles.personal_detail_label}>Mobile No:</Text>
                  <Text style={styles.personal_detail_text}>
                    {profile.MobileNo}
                  </Text>
                </View>
                <View style={styles.signup_btn_view}>
                  <TouchableOpacity
                    style={[styles.signup_btn_player, { width: 200 }]}
                    onPress={() => setEdit(true)}>
                    <View style={styles.signup_btn_player_view}>
                      <Text style={styles.signup_player_text}>
                        Edit Details
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Tab>
          <Tab
            activeTextStyle={{ color: Colors.s_blue }}
            tabStyle={{ backgroundColor: 'white' }}
            activeTabStyle={{ backgroundColor: 'white' }}
            heading="Change Password">
            <Formik
              innerRef={r => (paswordFormikRef.current = r)}
              initialValues={{
                password: '',
                confirmPassword: '',
                newPassword: '',
              }}
              validate={values => {
                onBlur()
                const errors = {}

                if (!values.password) errors.password = 'Required'

                if (!values.newPassword) {
                  errors.newPassword = 'Required'
                } else if (values.newPassword.length < 8) {
                  errors.newPassword = 'Must be at least 8 characters long'
                } else if (/\d/.test(values.newPassword) == false) {
                  errors.newPassword = 'Must include one number'
                } else if (/[A-Z]/.test(values.newPassword) == false) {
                  errors.newPassword = 'Must include one uppercase character'
                } else if (
                  /[~`!#$%@\^&*+=\-\[\]\\';,/{}|\\":<>\?\.!]/g.test(
                    values.newPassword,
                  ) == false
                ) {
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
                  oldPassword: values.password,
                  newPassword: values.newPassword,
                }
                return changePassword({ data }).then(() => {
                  Alert.alert('', 'Your password has been changed')
                  dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.LOGOUT })
                })
              }}>
              {({
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
              }) => (
                <View style={{ padding: '5%' }}>
                  <View style={styles.signup_info_view}>
                    <View style={styles.signup_info_view}>
                      <TextInput
                        style={{ color: 'black' }}
                        placeholderTextColor="rgba(0,0,0,0.3)"
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(e) => {
                          onBlur()
                          handleChange('password')(e)
                        }}
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />
                    </View>
                    {errors.password && touched.password && (
                      <ErrorLabel text={errors.password} />
                    )}
                    <TextInput
                      style={{ color: 'black' }}
                      placeholderTextColor="rgba(0,0,0,0.3)"
                      placeholder="New Password"
                      secureTextEntry
                      onChangeText={(e) => {
                        onBlur()
                        handleChange('newPassword')(e)
                      }}
                      onBlur={handleBlur('newPassword')}
                      value={values.newPassword}
                    />
                  </View>
                  {errors.newPassword && touched.newPassword && (
                    <ErrorLabel text={errors.newPassword} />
                  )}
                  <View style={styles.signup_info_view}>
                    <TextInput
                      style={{ color: 'black' }}
                      placeholderTextColor="rgba(0,0,0,0.3)"
                      placeholder="Confirm Password"
                      secureTextEntry
                      onChangeText={(e) => {
                        onBlur()
                        handleChange('confirmPassword')(e)
                      }}
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
                </View>
              )}
            </Formik>
          </Tab>
        </Tabs>
      </View>
    </ScrollView>
  )
}

export default PersonalDetails
