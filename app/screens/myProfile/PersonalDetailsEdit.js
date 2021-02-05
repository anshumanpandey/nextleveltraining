import React, {useState, useRef, useEffect} from 'react'
import {Text, TouchableOpacity, Dimensions} from 'react-native'
import GlobalStyles from '../../constants/GlobalStyles'
import {Formik} from 'formik'
import ErrorLabel from '../../components/ErrorLabel'
import {View, Input as TextInput} from 'native-base'
import styles from '../../components/userDataForm/styles.js'
import useAxios from 'axios-hooks'
import {
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
} from '../../state/GlobalState'
import NLAddressSuggestionInput, {
  getFullSuggestionAddress,
} from '../../components/NLAddressSuggestionInput'
import NLDropdownMenu from '../../components/NLDropdownMenu'

const PersonalDetailsEdit = (props) => {
  const formikRef = useRef()
  const [addresses, setAddresses] = useState([])

  const [{data, loading, error}, editDetails] = useAxios(
    {
      url: '/Users/UpdateProfile',
      method: 'POST',
    },
    {manual: true},
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
        postCode: props.PostCode,
        state: props.state,
        lat: '',
        lng: '',
      }}
      validate={values => {
        const errors = {}

        console.log(values)
        if (!values.fullName) errors.fullName = 'Required'
        if (!values.address) errors.address = 'Required'
        if (!values.mobileNo) errors.mobileNo = 'Required'
        if (!values.postCode) errors.postCode = 'Required'
        if (!values.state) errors.state = 'Required'
        return errors
      }}
      onSubmit={async values => {
        return editDetails({data: values})
          .then(r => {
            dispatchGlobalState({
              type: GLOBAL_STATE_ACTIONS.PROFILE,
              state: r.data,
            })
            props.cancelEdit()
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
                style={{color: 'black'}}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
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
              style={{width: '85%'}}
              placeholder={'Home Postcode'}
              defaultValue={values.postCode}
              onSuggestionsUpdated={suggetions => {
                setAddresses(suggetions)
              }}
            />
            {errors.address && touched.address && (
              <ErrorLabel text={errors.address} />
            )}

            <NLDropdownMenu
              disabled={addresses.length == 0}
              placeholder={
                addresses.length == 0 ? 'No options' : 'Select an address'
              }
              theme={{
                menu: {width: '80%'},
                textButton: {
                  fontSize: 18,
                  color: 'rgba(0,0,0,0.3)',
                  paddingLeft: 0,
                },
                button: {
                  ...styles.signup_info_view,
                  width: Dimensions.get('screen').width * 0.83,
                },
              }}
              onSelect={selected => {
                setFieldValue('address', getFullSuggestionAddress(selected))
                setFieldValue('lat', selected.latitude)
                setFieldValue('lng', selected.longitude)
                setFieldValue('postCode', selected.postcode)
                setFieldValue(
                  'state',
                  `${selected.county}, ${selected.country}`,
                )
              }}
              options={addresses.map(a => ({
                label: getFullSuggestionAddress(a),
                value: a,
              }))}
            />
            {errors.postCode && touched.postCode && (
              <ErrorLabel text={errors.postCode} />
            )}

            <View style={styles.signup_info_view}>
              <TextInput
                style={{color: 'black'}}
                disabled={true}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
                placeholder="County"
                // onChangeText={handleChange('state')}
                // onBlur={handleBlur('state')}
                value={values.state}
              />
            </View>
            {errors.state && touched.state && (
              <ErrorLabel text={errors.state} />
            )}

            <View style={styles.signup_info_view}>
              <TextInput
                style={{color: 'black'}}
                placeholderTextColor={'rgba(0,0,0,0.3)'}
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
                  {width: 200},
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
                {width: 200}
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
