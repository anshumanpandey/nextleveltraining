import React, { useEffect, useRef } from 'react'
import { ScrollView, View, TextInput as RNTextInput, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import useAxios from 'axios-hooks'
import PropTypes from 'prop-types'
import { Formik } from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import { Spinner } from 'native-base';
import GlobalStyles from '../../../constants/GlobalStyles';
import NLCropperImagePicker from '../../../components/NLCropperImagePicker';
import { useFileUploader, FILE_TYPE_UPLOAD } from '../../../utils/useFileUpload';
import { useGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../../state/GlobalState';
import NLAddressSuggestionInput, { usePostCodeSearch } from '../../../components/postcodeInput';
import ErrorLabel from '../../../components/ErrorLabel';
import styles from "../CoachStyle";
import Colors from "../../../constants/color";

export const TrainingLocationForm = ({ setSubmitFn, onCreate, navigation, ...params }) => {
  const postCoder = usePostCodeSearch()
  const formikRef = useRef()
  const [profile] = useGlobalState('profile')
  const [{ loading }, doPost] = useAxios({
    url: '/Users/SaveTrainingLocation',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  const [{ loading: uploadingFile }, uploadFile] = useFileUploader()

  useEffect(() => {
    if (setSubmitFn) {
      setSubmitFn(formikRef?.current?.submitForm)
    }
    formikRef?.current?.setFieldValue("trainingLocationId", params?.Id || undefined)
    formikRef?.current?.setFieldValue("locationName", params?.LocationName || "")
    formikRef?.current?.setFieldValue("address", params?.LocationAddress || "")
    formikRef?.current?.setFieldValue("file", null)
    formikRef?.current?.setFieldValue("file", null)
    formikRef?.current?.setFieldValue("lat", params?.Lat || 0)
    formikRef?.current?.setFieldValue("lng", params?.Lng || 0)

    if (params?.ImageUrl) {
      formikRef?.current?.setFieldValue('file', { uri: params?.ImageUrl })
    } else {
      AsyncStorage.getItem((`Location-${params.Id}-file`).toString())
        .then(img => {
          if (!img) return
          formikRef?.current?.setFieldValue('file', JSON.parse(img).file)
        })
    }

  }, [params.Id, params.LocationName, params.LocationAddress])

  useEffect(() => {
    const focusListener = navigation?.addListener('didFocus', () => {
      formikRef?.current?.setFieldValue("locationName", params?.LocationName || "")
      formikRef?.current?.setFieldValue("trainingLocationId", params?.Id || undefined)
      formikRef?.current?.setFieldValue("address", params?.LocationAddress || "")
      formikRef?.current?.setFieldValue("file", params.ImageUrl ? { imageUrl: params.ImageUrl } : null)
      formikRef?.current?.setFieldValue("lat", params?.Lat || 0)
      formikRef?.current?.setFieldValue("lng", params?.Lng || 0)
    })

    const blurListener = navigation?.addListener('didBlur', () => {
      formikRef?.current?.setFieldValue("trainingLocationId", undefined)
      formikRef?.current?.setFieldValue("locationName", "")
      formikRef?.current?.setFieldValue("address", "")
      formikRef?.current?.setFieldValue("file", null)
      formikRef?.current?.setFieldValue("lat", 0)
      formikRef?.current?.setFieldValue("lng", 0)
      formikRef?.current?.setErrors({
        locationName: undefined,
        address: undefined,
      })
    });

    return () => {
      focusListener?.remove()
      blurListener?.remove()
    }
  }, [])

  const signupIsDisabled = () => loading || getUserReq.loading || uploadingFile

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
      <Formik
        innerRef={(r) => { formikRef.current = r }}
        initialValues={{
          trainingLocationId: params.Id || undefined,
          locationName: params.LocationName || "",
          address: params.LocationAddress || "",
          file: params.ImageUrl || null,
          lat: params.Lat || 0,
          lng: params.Lng || 0
        }}
        validate={(values) => {
          const errors = {}

          if (!values.locationName) errors.locationName = 'Required'
          if (!values.address) errors.address = 'Required'

          return errors
        }}
        onSubmit={(values, { setFieldValue, setErrors, setTouched }) => {
          let promise = Promise.resolve()
          if (values.file && values.file.imageUrl !== undefined) {
            promise = uploadFile({
              file: values.file,
              type: FILE_TYPE_UPLOAD.LOCATION
            })
          }

          promise.then(({ responseBody }) => {
            const dataToSend = {
              "trainingLocationId": values.trainingLocationId || undefined,
              "locationName": values.locationName,
              "LocationAddress": values.address,
              "role": profile.Role,
              "playerOrCoachID": profile.Id,
              lat: parseFloat(values.lat.toFixed(2)),
              lng: parseFloat(values.lng.toFixed(2)),
              ImageUrl: responseBody
            }

            return doPost({ data: dataToSend })
          })
            .then(() => getUserData())
            .then((r) => {
              if (onCreate) {
                onCreate(() => {
                  dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                });
              } else {
                dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
              }
              setErrors({
                locationName: undefined,
                address: undefined,
                file: undefined,
              })
              setTouched({
                locationName: undefined,
                address: undefined,
                file: undefined,
              })

              setFieldValue("trainingLocationId", undefined)
              setFieldValue("locationName", "")
              setFieldValue("address", "")
              setFieldValue("file", null)
              setFieldValue("lat", 0)
              setFieldValue("lng", 0)
            })
            .catch(err => console.log(err))
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <>
            <View style={styles.containerCommon}>
              <View style={styles.inputContainer}>
                <RNTextInput
                  style={extraStyles.input}
                  placeholderTextColor="rgba(0,0,0,0.3)"
                  placeholder="Location Name"
                  onChangeText={handleChange('locationName')}
                  onBlur={handleBlur('locationName')}
                  value={values.locationName}
                />
              </View>
              {errors.locationName && touched.locationName && <ErrorLabel text={errors.locationName} />}

              <NLAddressSuggestionInput
                showList
                defaultValue={values.address}
                onLocationSelected={(loc) => {
                  postCoder.getSiteDetails(loc)
                    .then(details => {
                      const coord = details.getPlaceLatLong()
                      setFieldValue('address', details.getAddress())
                      setFieldValue('lat', coord.lat)
                      setFieldValue('lng', coord.lng)
                    })
                }}
              />

              {errors.address && touched.address && <ErrorLabel text={errors.address} />}

              <FakeInput
                isActive={values.file?.fileName || values.file?.uri || values.file?.imageUrl}
                placeholder="Upload Training Location image"
                value={values.file?.uri?.split("/").pop()}
              />
              <NLCropperImagePicker onFileSelected={(file) => {
                setFieldValue("file", file)
              }} />
              {(values.file?.uri || values.file?.imageUrl) && <Image style={{ height: 250, resizeMode: 'contain' }} source={{ uri: values.file?.uri || values.file?.imageUrl }} />}
              {errors.file && touched.file && <ErrorLabel text={errors.file} />}

              {!setSubmitFn && (
                <View style={styles.signup_btn_view}>
                  <TouchableOpacity
                    disabled={signupIsDisabled()}
                    style={[styles.buttonSave, { width: 200 }, signupIsDisabled() && GlobalStyles.disabled_button]}
                    onPress={handleSubmit}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: 'white' }}>Save</Text>
                      {signupIsDisabled() && <Spinner color={Colors.s_yellow} />}
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const FakeInput = ({ isActive, placeholder, value }) => (
  <View style={[styles.inputContainer, extraStyles.fileNameInput]}>
    <Text numberOfLines={1} style={[extraStyles.fileNameInputText, isActive && extraStyles.fileNameInputText]}>
      {isActive ? value : placeholder}
    </Text>
  </View>
)

FakeInput.propTypes = {
  isActive: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

const extraStyles = StyleSheet.create({
  input: { height: 50, color: 'black', paddingLeft: 5 },
  fileNameInput: { marginTop: '2%' },
  fileNameInputText: { paddingLeft: 5, color: 'rgba(0,0,0,0.3)', paddingVertical: '4%' },
  fileNameInputTextActive: { paddingLeft: 5, color: "black", paddingVertical: '4%' }

});

export default TrainingLocationForm;