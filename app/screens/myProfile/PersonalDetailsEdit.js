import React, { useState, useRef, useEffect } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import { View, Input as TextInput } from 'native-base'
import useAxios from 'axios-hooks'
import ErrorLabel from '../../components/ErrorLabel'
import styles from '../../components/userDataForm/styles'
import {
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
} from '../../state/GlobalState'
import NLAddressSuggestionInput from '../../components/postcodeInput/NLAddressSuggestionInput'
import { usePostCodeSearch } from '../../components/postcodeInput/state';

const PersonalDetailsEdit = (props) => {
  const postCodeSearch = usePostCodeSearch()
  const formikRef = useRef()

  const [, editDetails] = useAxios(
    {
      url: '/Users/UpdateProfile',
      method: 'POST',
    },
    { manual: true },
  )

  useEffect(() => {
    props.setSubmitFn && props.setSubmitFn(formikRef.current?.submitForm)
  }, [])

  return (
    <Formik
      innerRef={r => (formikRef.current = r)}
      initialValues={{
        fullName: props.FullName,
        address: props.Address,
        mobileNo: props.MobileNo,
        postCode: props.postCode,
        state: props.state,
        lat: '',
        lng: '',
      }}
      validate={values => {
        const errors = {}

        if (!values.fullName) errors.fullName = 'Required'
        if (!values.address) errors.address = 'Required'
        if (!values.mobileNo) errors.mobileNo = 'Required'
        if (!values.state) errors.state = 'Required'

        return errors
      }}
      onSubmit={async values => editDetails({ data: values })
        .then(r => {
          dispatchGlobalState({
            type: GLOBAL_STATE_ACTIONS.PROFILE,
            state: r.data,
          })
          props.cancelEdit()
        })
        .catch(r => console.log(r))}>
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
              onLocationSelected={location => {
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
            {errors.address && touched.address && (
              <ErrorLabel text={errors.address} />
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
          </View>
          {props.hideSaveBtn != true && (
            <View style={styles.signup_btn_view}>
              <TouchableOpacity
                style={[
                  styles.signup_btn_player,
                  { width: 200 },
                ]}
                onPress={handleSubmit}>
                <View style={styles.signup_btn_player_view}>
                  <Text style={styles.signup_player_text}>Update</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.signup_btn_view}>
            <TouchableOpacity
              style={[
                styles.signup_btn_player,
                { width: 200 }
              ]}
              onPress={props.cancelEdit}>
              <View style={styles.signup_btn_player_view}>
                <Text style={styles.signup_player_text}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Formik>
  )
}

export default PersonalDetailsEdit
